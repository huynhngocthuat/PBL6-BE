import { CategoryTopicsRepository } from "repositories";

class CategoryTopicsService {
  constructor(repo) {
    this.repo = repo;
<<<<<<< HEAD
=======
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
  }

  async create(data) {
    try {
      return await this.repo.create(data);
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error);
=======
      throw new Error("CategoryTopic not created");
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
    }
  }

  async get(id = null) {
    try {
      if (id) {
        return await this.repo.get(id);
      }
      return await this.repo.getAll();
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error);
=======
      throw new Error("Can not get category topic");
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
    }
  }

  async update(id, data) {
    try {
      return await this.repo.updateByPk(id, data);
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error);
=======
      console.log(error);
      throw new Error("CategoryTopic not update");
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
    }
  }

  async delete(id) {
    try {
      return await this.repo.delete(id);
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error);
=======
      throw new Error("CategoryTopic not delete");
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
    }
  }

  async getCategoryByCondition(condition) {
    try {
      return await this.repo.getByCondition(condition);
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error);
=======
      throw new Error("Cant get category by condition");
>>>>>>> ee0b7451de4347f87ae91b1a22834c6e65865503
    }
  }
}

export default new CategoryTopicsService(CategoryTopicsRepository);
