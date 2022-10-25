/* eslint-disable no-useless-constructor */
import { CoursesRepository } from 'repositories';
import BaseService from './base.service';

class CoursesService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new CoursesService(CoursesRepository);
