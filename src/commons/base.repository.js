import logger from 'configs/winston.config';
import { errors, infors } from 'constants';
import { getPagingData } from 'helpers/pagging';

export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(input, transaction = null) {
    try {
      const data = await this.model.create(input, transaction);
      logger.info(infors.CREATE_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(
        `${errors.CREATE_AT_REPO.format(this.model.name)} - ${error}`
      );
      throw new Error(error);
    }
  }

  async updateByPk(id, data) {
    const itemUpdate = await this.find(id);
    if (!itemUpdate) {
      throw new Error('Item update not found');
    }

    Object.assign(itemUpdate, data);

    const dataUpdate = await itemUpdate.save();
    return dataUpdate;
  }

  async updateByCondition(condition, input) {
    try {
      const data = await this.model.update(
        { ...input },
        {
          where: { ...condition },
          returning: true,
        }
      );
      logger.info(
        infors.UPDATE_BY_CONDITION_AT_REPO_SUCCESS.format(this.model.name)
      );

      return data;
    } catch (error) {
      logger.error(
        `${errors.UPDATE_BY_CONDITION_AT_REPO.format(
          this.model.name
        )} - ${error}`
      );
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const data = await this.model.destroy({
        where: {
          id,
        },
      });
      logger.info(infors.DELETE_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(
        `${errors.DELETE_AT_REPO.format(this.model.name)} - ${error}`
      );
      throw new Error(error);
    }
  }

  async find(id) {
    try {
      const data = await this.model.findByPk(id);
      logger.info(infors.FIND_BY_ID_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(
        `${errors.FIND_BY_ID_AT_REPO.format(this.model.name)} - ${error}`
      );
      throw new Error(error);
    }
  }

  async findAll(pagination = null) {
    try {
      let data;
      if (pagination) {
        const { offset, limit } = pagination;

        data = await this.model.findAll({
          offset,
          limit,
        });

        const total = await this.model.count();
        const pagingData = getPagingData(
          total,
          Math.ceil(offset / limit) + 1, // cal current_page
          limit
        );

        data.pagination = pagingData;
      } else {
        data = await this.model.findAll();
      }

      logger.info(infors.FIND_AT_REPO_SUCCESS.format(this.model.name));
      return data;
    } catch (error) {
      logger.error(`${errors.FIND_AT_REPO.format(this.model.name)} - ${error}`);
      throw new Error(error);
    }
  }

  async findOneByCondition(condition, isDeleted = false, include = null) {
    try {
      const data = await this.model.findOne({
        include,
        where: { ...condition },
        paranoid: !isDeleted,
      });

      logger.info(
        infors.FIND_ONE_BY_CONDITION_AT_REPO_SUCCESS.format(this.model.name)
      );

      return data;
    } catch (error) {
      logger.error(
        `${errors.FIND_ONE_BY_CONDITION_AT_REPO.format(
          this.model.name
        )} - ${error}`
      );
      throw new Error(error);
    }
  }

  async findAllByCondition(condition, isDeleted = false, pagination = null) {
    try {
      let data;
      if (pagination) {
        const { offset, limit } = pagination;

        data = await this.model.findAll({
          where: { ...condition },
          paranoid: !isDeleted,
          offset,
          limit,
        });

        const total = await this.model.count({
          where: { ...condition },
          paranoid: !isDeleted,
        });

        const pagingData = getPagingData(
          total,
          Math.ceil(offset / limit) + 1,
          limit
        );

        data.pagination = pagingData;
      } else {
        data = await this.model.findAll({
          where: { ...condition },
          paranoid: !isDeleted,
        });
      }

      logger.info(
        infors.FIND_ALL_BY_CONDITION_AT_REPO_SUCCESS.format(this.model.name)
      );

      return data;
    } catch (error) {
      logger.error(
        `${errors.FIND_ALL_BY_CONDITION_AT_REPO.format(
          this.model.name
        )} - ${error}`
      );
      throw new Error(error);
    }
  }
}
