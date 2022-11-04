import { SectionsRepository } from 'repositories';
import BaseService from './base.service';

class SectionsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async findSectionByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SectionsService(SectionsRepository);
