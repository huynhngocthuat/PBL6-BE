import { CategoryTopicsRepository } from 'repositories';
import BaseService from './base.service';

class CategoryTopicsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * Get list category with condition
   * @param {object} condition is condition to find category, e.g, {id: categoryId,}
   * @returns {object} data about model category is returned from repository
   */
  async findCategoryByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CategoryTopicsService(CategoryTopicsRepository);
