import logger from "configs/winston.config";

import { errors, infors } from "constants";

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(input) {
    try {
      const data = await this.model.create(input);
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
    const itemUpdate = await this.get(id);
    if (!itemUpdate) {
      throw new Error("Item update not found");
    }

    Object.assign(itemUpdate, data);

    return await itemUpdate.save();
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
          id: id,
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

  async get(id) {
    try {
      const data = await this.model.findByPk(id);
      logger.info(infors.GET_BY_ID_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(
        `${errors.GET_BY_ID_AT_REPO.format(this.model.name)} - ${error}`
      );
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.findAll();
      logger.info(infors.GET_AT_REPO_SUCCESS.format(this.model.name));

      return data;
    } catch (error) {
      logger.error(`${errors.GET_AT_REPO.format(this.model.name)} - ${error}`);
      throw new Error(error);
    }
  }

  async getByCondition(condition) {
    try {
      const data = await this.model.findOne({
        where: { ...condition },
      });
      logger.info(
        infors.GET_ONE_BY_CONDITION_AT_REPO_SUCCESS.format(this.model.name)
      );

      return data;
    } catch (error) {
      logger.error(
        `${errors.GET_ONE_BY_CONDITION_AT_REPO.format(
          this.model.name
        )} - ${error}`
      );
      throw new Error(error);
    }
  }

  async getAllByCondition(condition) {
    try {
      const data = await this.model.findAll({
        where: { ...condition },
      });
      logger.info(
        infors.GET_ALL_BY_CONDITION_AT_REPO_SUCCESS.format(this.model.name)
      );

      return data;
    } catch (error) {
      logger.error(
        `${errors.GET_ALL_BY_CONDITION_AT_REPO.format(
          this.model.name
        )} - ${error}`
      );
      throw new Error(error);
    }
  }
}
