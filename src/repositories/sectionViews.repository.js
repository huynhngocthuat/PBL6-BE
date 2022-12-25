import BaseRepository from 'commons/base.repository';
import db from 'models';

const { SectionView } = db;

export class SectionViewsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new SectionViewsRepository(SectionView);
