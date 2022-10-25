import { CategoryTopicsRepository } from 'repositories';
import { getPagination } from 'helpers/pagging';

class CategoryTopicsService {
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
      return await this.repo.find(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(pagination = null) {
    try {
      if (pagination) {
        const { offset, limit } = getPagination(pagination);
        return await this.repo.findAll({ offset, limit });
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

  async findCategoryByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CategoryTopicsService(CategoryTopicsRepository);
