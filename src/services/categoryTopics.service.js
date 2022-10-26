import { CategoryTopicsRepository } from 'repositories';
import BaseService from './base.service';

class CategoryTopicsService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(repo) {
    super(repo);
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
