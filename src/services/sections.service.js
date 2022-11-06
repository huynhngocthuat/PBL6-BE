import { SectionsRepository } from 'repositories';
import { json } from 'utils';
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

  async findVideosBySection(sectionId, isDeleted = false) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: sectionId },
        isDeleted,
        { association: 'videos' }
      );

      const { videos } = json(data);

      return videos;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countSectionsOfCourse(courseId) {
    try {
      return this.repo.countSectionsOfCourse(courseId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SectionsService(SectionsRepository);
