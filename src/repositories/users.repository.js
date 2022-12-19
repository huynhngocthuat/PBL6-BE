import logger from 'configs/winston.config';
import { errors, infors } from 'constants';
import BaseRepository from 'commons/base.repository';
import db from 'models';

const { User } = db;

export class UsersRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getUserByEmail(email) {
    try {
      const data = await this.findOneByCondition({
        email,
      });

      logger.info(infors.FIND_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(
        `${errors.CREATE_AT_REPO.format(this.model.name)} - ${error}`
      );
      throw new Error(error);
    }
  }

  async getUserByConfirmToken(confirmToken) {
    const user = await this.findOneByCondition({
      confirmToken,
    });
    return user;
  }

  // async searchUser(keyword, pagination) {
  //   try {
  //     if (pagination) {
  //       const { offset, limit } = pagination;

  //       const data = await this.model.findAll({
  //         where: {
  //           role: {
  //             $or: [roles.INSTRUCTOR_ROLE, roles.USER_ROLE],
  //           },
  //           $and: {
  //             $or: [
  //               {
  //                 fullName: {
  //                   $iLike: `%${keyword}%`,
  //                 },
  //               },
  //               {
  //                 email: {
  //                   $iLike: `%${keyword}%`,
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //         logging: console.log,
  //         offset,
  //         limit,
  //       });

  //       const total = await this.model.count({
  //         where: { ...condition },
  //         paranoid: !isDeleted,
  //       });

  //       const pagingData = getPagingData(
  //         total,
  //         Math.ceil(offset / limit) + 1,
  //         limit
  //       );

  //       data.pagination = pagingData;

  //       return data;
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

export default new UsersRepository(User);
