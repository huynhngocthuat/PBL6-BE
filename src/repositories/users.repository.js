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

      logger.info(infors.CREATE_AT_REPO_SUCCESS.format(this.model.name));

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
}

export default new UsersRepository(User);
