import TotalDisLikeVideo from 'dtos/totalDislikeVideo';
import TotalLikeVideo from 'dtos/totalLikeVideo';
import { EmotionReactsRepository } from 'repositories';
import { json } from 'utils';
import BaseService from './base.service';

class EmotionReactsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async countLikesOfVideo(videoId) {
    try {
      const data = await this.repo.countLikesOfVideo(videoId);
      let totalLike = {};

      // if data is null assign 0
      if (!data) {
        totalLike.total = 0;
      } else {
        totalLike = json(data);
        totalLike.total = +totalLike.total;
      }

      return new TotalLikeVideo(totalLike);
    } catch (error) {
      throw new Error(error);
    }
  }

  async countDisLikesOfVideo(videoId) {
    try {
      const data = await this.repo.countDisLikesOfVideo(videoId);
      let totalDisLike = {};

      // if data is null assign 0
      if (!data) {
        totalDisLike.total = 0;
      } else {
        totalDisLike = json(data);
        totalDisLike.total = +totalDisLike.total;
      }

      return new TotalDisLikeVideo(totalDisLike);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new EmotionReactsService(EmotionReactsRepository);
