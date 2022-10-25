import { CoursesRepository } from 'repositories';

class CoursesService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(data) {
    try {
      return await this.repo.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(id) {
    try {
      if (id) {
        return await this.repo.find(id);
      }
      return await this.repo.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, data) {
    try {
      return await this.repo.updateByPk(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.repo.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(CoursesRepository);
