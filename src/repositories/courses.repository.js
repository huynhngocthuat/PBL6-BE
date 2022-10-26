/* eslint-disable no-unused-vars */
import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Course } = db;

export class CoursesRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(model) {
    super(model);
  }
}

export default new CoursesRepository(Course);
