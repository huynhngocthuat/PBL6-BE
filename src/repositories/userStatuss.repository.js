import db from 'models';
import BaseRepository from 'commons/base.repository';

const { UserStatus } = db;

export class UserStatussRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new UserStatussRepository(UserStatus);
