import { UserResponse } from 'commons/responses/auth';
import { status } from 'constants';
import StatisticRequest from 'dtos/statisticRequest';
import { getPagination } from 'helpers/pagging';
import { userStatussRepository } from 'repositories';
import { json } from 'utils';
import BaseService from './base.service';

class UserStatussService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async getAll(pagination) {
    try {
      let userRequests = [];
      const data = {};
      if (pagination) {
        const { offset, limit } = getPagination(pagination);
        userRequests = await this.repo.findAll(
          { offset, limit },
          {
            association: 'user',
          }
        );

        data.pagination = userRequests.pagination;
      } else {
        userRequests = await this.repo.findAll(null, {
          association: 'user',
        });
      }

      data.userRequests = Array.from(json(userRequests) || [], (x) => {
        // eslint-disable-next-line no-param-reassign
        x.user = new UserResponse(x.user);
        return x;
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserRequestByStatus(userId, status) {
    try {
      const condition = {
        status,
        userId,
      };
      const data = await this.repo.findOneByCondition(condition);

      return json(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async statisticRequestBecomeInstructorOfUser() {
    const data = await this.repo.statisticRequestBecomeInstructorOfUser();
    const jsonData = json(data);
    const res = [
      new StatisticRequest({ status: status.WAITING_STATUS }),
      new StatisticRequest({ status: status.ACCEPTED_STATUS }),
      new StatisticRequest({ status: status.DENIED_STATUS }),
    ];

    res.forEach((item, index) => {
      const temp = jsonData.find((x) => x.status === res[index].status);
      if (temp) {
        res[index].total = temp.total;
      }
    });
    return res;
  }
}

export default new UserStatussService(userStatussRepository);
