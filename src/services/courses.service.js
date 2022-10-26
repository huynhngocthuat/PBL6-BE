import { CoursesRepository } from 'repositories';
import BaseService from './base.service';

class CoursesService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(repo) {
    super(repo);
  }
}

export default new CoursesService(CoursesRepository);
