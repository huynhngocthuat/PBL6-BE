import { CoursesRepository } from 'repositories';
import { json } from 'utils';
import { getPagination, getPagingData } from 'helpers/pagging';
import BaseService from './base.service';
import SectionsService from './sections.service';

class CoursesService extends BaseService {
  constructor(repo, sectionsService) {
    super(repo);
    this.sectionsService = sectionsService;
  }

  async findCourseByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSectionsByCourse(courseId, pagination = null, isDeleted = false) {
    try {
      const resp = {};
      let data;
      const total = await this.sectionsService.countSectionsOfCourse(courseId);

      if (pagination) {
        const { offset, limit } = getPagination(pagination);

        data = await this.repo.findOneByCondition({ id: courseId }, isDeleted, {
          association: 'sections',
          offset,
          limit,
        });

        resp.pagination = getPagingData(
          total,
          Math.ceil(offset / limit) + 1,
          limit
        );
      } else {
        data = await this.repo.findOneByCondition({ id: courseId }, isDeleted, {
          association: 'sections',
        });
      }

      const { sections } = json(data);
      resp.sections = sections;

      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(CoursesRepository, SectionsService);
