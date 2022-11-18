import { userDetailsRepository } from 'repositories';
import BaseService from './base.service';

class UserDetailsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async getUserDetailsByUserId(userId) {
    try {
      const userDetails = await this.repo.findOneByCondition({
        userId,
      });
      return userDetails;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserDetailsService(userDetailsRepository);
