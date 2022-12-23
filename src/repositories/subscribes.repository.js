import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Subscribe } = db;

export class SubscribeRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async countAllSubcriber() {
    try {
      const data = await this.model.count({ paranoid: false });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SubscribeRepository(Subscribe);
