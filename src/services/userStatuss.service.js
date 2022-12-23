import { UserResponse } from 'commons/responses/auth';
import { status } from 'constants';
import StatisticRequest from 'dtos/statisticRequest';
import { userStatussRepository } from 'repositories';
import { json } from 'utils';
import BaseService from './base.service';

class UserStatussService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * It gets all user requests from the database and returns them in a paginated format
   * @param {object} condition is condition to filter request of user
   * @param {object} pagination is paging data have page and limit data
   * @return {object} is obejct have list user request and pagination
   */
  async getRequestsOfUserByCondition(condition, pagination) {
    try {
      const data = {};
      // eslint-disable-next-line no-param-reassign
      condition.status =
        condition.status.toUpperCase() === status.WAITING_STATUS ||
        condition.status.toUpperCase() === status.ACCEPTED_STATUS ||
        condition.status.toUpperCase() === status.DENIED_STATUS
          ? [condition.status.toUpperCase()]
          : [
              status.WAITING_STATUS,
              status.ACCEPTED_STATUS,
              status.DENIED_STATUS,
            ];

      let statusCondition;
      if (condition.status.length === 1) {
        statusCondition = condition.status.toString();
      } else {
        statusCondition = {
          $or: condition.status,
        };
      }

      const cond = {
        status: statusCondition,
      };

      const include = {
        association: 'user',
        where: {
          fullName: {
            $iLike: `%${condition.keyword}%`,
          },
        },
      };

      const userRequests = await this.repo.getRequestsOfUserByCondition(
        cond,
        include,
        pagination
      );

      data.pagination = userRequests.pagination;

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
