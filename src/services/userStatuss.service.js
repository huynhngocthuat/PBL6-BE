import { UserResponse } from 'commons/responses/auth';
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
}

export default new UserStatussService(userStatussRepository);
