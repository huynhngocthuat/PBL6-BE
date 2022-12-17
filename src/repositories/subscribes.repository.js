import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Subscribe } = db;

export class SubscribeRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new SubscribeRepository(Subscribe);
