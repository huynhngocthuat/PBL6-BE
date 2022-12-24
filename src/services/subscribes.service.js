/* eslint-disable no-param-reassign */
import SoldCourse from 'commons/responses/soldCourse.response';
import BasicInfoCourse from 'dtos/basicInfoCourse';
import BasicInfoUser from 'dtos/basicInfoUser';
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
        x.user = new BasicInfoUser(x.user);
        x.course = new BasicInfoCourse(x.course);
        return new SoldCourse(x);
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SubscribesService(SubscribesRepository);
