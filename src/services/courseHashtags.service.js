import { CourseHashtagsRepository } from 'repositories';
import BaseService from './base.service';

class CourseHashtagsService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new CourseHashtagsService(CourseHashtagsRepository);
