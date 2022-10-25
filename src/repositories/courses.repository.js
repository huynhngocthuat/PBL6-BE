/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Course } = db;

export class CoursesRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new CoursesRepository(Course);
