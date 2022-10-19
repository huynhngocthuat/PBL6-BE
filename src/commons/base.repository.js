export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const itemUpdate = await this.get(id);
    if (!itemUpdate) {
      throw new Error("Item update not found");
    }
    Object.assign(itemUpdate, data);
    return await itemUpdate.save();
  }

  async delete(id) {
    return await this.model.destroy({ where: { id } });
  }

  async get(id) {
    return await this.model.findByPk(id);
  }

  async getAll() {
    return await this.model.find();
  }
}
