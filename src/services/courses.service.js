import { CoursesRepository } from 'repositories';
import BaseService from './base.service';

class CoursesService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async findCourseByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(CoursesRepository);
