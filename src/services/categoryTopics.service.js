import { CategoryTopicsRepository } from "repositories";
import * as CONSTANTS from "constants";

class CategoryTopicsService {
  constructor(repo) {
    this.repo = repo;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
  }

  async create(data) {
    try {
      return await this.repo.create(data);
    } catch (error) {
      throw new Error("CategoryTopic not created");
    }
  }

  async get(id = null) {
    try {
      if (id) {
        return await this.repo.get(id);
      }
      return await this.repo.getAll();
    } catch (error) {
      throw new Error("Can not get category topic");
    }
  }

  async update(id, data) {
    try {
      return await this.repo.updateByPk(id, data);
    } catch (error) {
      console.log(error);
      throw new Error("CategoryTopic not update");
    }
  }

  async delete(id) {
    try {
      return await this.repo.delete(id);
    } catch (error) {
      throw new Error("CategoryTopic not delete");
    }
  }
}

export default new CategoryTopicsService(CategoryTopicsRepository);
