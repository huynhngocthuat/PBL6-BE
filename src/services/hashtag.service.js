import { HashtagsRepository } from 'repositories';
import BaseService from './base.service';

class HashtagsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * Find hashtag with condition
   * @param {object} condition is condition to find hashtag, e.g, {id: hashtagId,}
   * @returns {object} data about model hashtag is returned from repository
   */
  async findHashtagByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new HashtagsService(HashtagsRepository);
