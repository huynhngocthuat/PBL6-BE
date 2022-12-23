import db from 'models';
import BaseRepository from 'commons/base.repository';
import { Sequelize } from 'sequelize';
import { getPagination } from 'helpers/pagging';

const { UserStatus } = db;

export class UserStatussRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getRequestsOfUserByCondition(condition, include, pagination) {
    try {
      const { offset, limit } = getPagination(pagination);
      const data = await this.findAllByCondition(
        condition,
        false,
        { offset, limit },
        include
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async statisticRequestBecomeInstructorOfUser() {
    try {
      const data = await this.model.findAll({
        where: null,
        attributes: [
          'status',
          [Sequelize.fn('COUNT', Sequelize.col('status')), 'total'],
        ],
        group: 'status',
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserStatussRepository(UserStatus);
