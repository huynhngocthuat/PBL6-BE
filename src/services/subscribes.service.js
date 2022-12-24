import { UserResponse } from 'commons/responses/auth';
import TotalPurchaser from 'dtos/totalPurchaser';
import { getPagination } from 'helpers/pagging';
import { SubscribesRepository } from 'repositories';
import { json } from 'utils';
import BaseService from './base.service';

class SubscribesService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async countAllSubcriber() {
    try {
      const data = await this.repo.countAllSubcriber();
      const totalPurchaser = {};

      // if data is null assign 0
      if (!data) {
        totalPurchaser.total = 0;
      } else {
        totalPurchaser.total = data;
      }

      return new TotalPurchaser(totalPurchaser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllSoldCourses(pagination) {
    try {
      const include = [
        {
          association: 'user',
        },
        {
          association: 'course',
        },
      ];

      const { offset, limit } = getPagination(pagination);

      const data = await this.repo.findAll({ offset, limit }, include);

      data.soldCourses = Array.from(json(data) || [], (x) => {
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

export default new SubscribesService(SubscribesRepository);
