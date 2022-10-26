/* eslint-disable no-useless-constructor */
import db from 'models';
import BaseRepository from 'commons/base.repository';

const { CategoryTopic } = db;

export class CategoryTopicsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new CategoryTopicsRepository(CategoryTopic);
