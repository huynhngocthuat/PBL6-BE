import BaseRepository from 'commons/base.repository';
import db from 'models';

const { UserDetail } = db;

export class UsersRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new UsersRepository(UserDetail);
