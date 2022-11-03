import { CoursesRepository } from 'repositories';
import { json } from 'utils';
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

  async findSectionsByCourse(courseId, isDeleted = false) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: courseId },
        isDeleted,
        { association: 'sections' }
      );

      const { sections } = json(data);

      return sections;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(CoursesRepository);
