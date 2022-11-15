/* eslint-disable no-useless-constructor */
import db from 'models';
import BaseRepository from 'commons/base.repository';

const { CourseHashtag } = db;

export class CourseHashtagsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new CourseHashtagsRepository(CourseHashtag);
