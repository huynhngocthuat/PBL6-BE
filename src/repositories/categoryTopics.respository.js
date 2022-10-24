import db from 'models';
import BaseRepository from 'commons/base.repository';

const { CategoryTopic } = db;

export class CategoryTopicsRepository extends BaseRepository {
  constructor() {
    super(CategoryTopic);
  }
}

export default new CategoryTopicsRepository();
