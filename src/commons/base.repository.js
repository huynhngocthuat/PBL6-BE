export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async updateByPk(id, data) {
    const itemUpdate = await this.get(id);
    if (!itemUpdate) {
      throw new Error("Item update not found");
    }

    Object.assign(itemUpdate, data);

    return await itemUpdate.save();
  }

  async updateByCondition(condition, data) {
    try {
      return await this.model.update(
        { ...data },
        {
          where: { ...condition },
          returning: true,
        }
      );
    } catch (error) {
      console.log("Error when update", error);
    }
  }

  async delete(id) {
    try {
      return await this.model.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log("Error when delete", error);
    }
  }

  async get(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      console.log("Error when get", error);
    }
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      console.log("Error when get all", error);
    }
  }

  async getByCondition(condition) {
    try {
      return await this.model.findOne({
        where: { ...condition },
      });
    } catch (err) {
      console.log("Cannot get by condition", err);
    }
  }

  async getAllByCondition(condition) {
    try {
      return await this.model.findAll({
        where: { ...condition },
      });
    } catch (err) {
      console.log("Cannot get all by condition", err);
    }
  }
}
