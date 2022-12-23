import TotalCommentVideo from 'dtos/totalCommentVideo';
import { VideoCommentsRepository } from 'repositories';
import { json } from 'utils';
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

  async countCommentOfVideo(videoId) {
    try {
      const data = await this.repo.countCommentOfVideo(videoId);
      let totalComment = {};

      // if data is null assign 0
      if (!data) {
        totalComment.total = 0;
      } else {
        totalComment = json(data);
        totalComment.total = +totalComment.total;
      }

      return new TotalCommentVideo(totalComment);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoCommentsService(VideoCommentsRepository);
