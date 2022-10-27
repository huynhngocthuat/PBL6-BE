import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Section } = db;

export class SectionsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new SectionsRepository(Section);
