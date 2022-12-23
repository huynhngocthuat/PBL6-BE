import { usersRepository } from 'repositories';
import BaseService from './base.service';

class AdminsService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new AdminsService(usersRepository);
