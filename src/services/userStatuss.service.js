import { userStatussRepository } from 'repositories';
import BaseService from './base.service';

class UserStatussService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async getAll() {
    try {
      const data = await this.repo.findAll();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserStatussService(userStatussRepository);
