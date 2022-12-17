import { VideoCommentsRepository } from 'repositories';
import BaseService from './base.service';

class VideoCommentsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async findVideoCommentByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoCommentsService(VideoCommentsRepository);
