import db from 'models';
import BaseRepository from 'commons/base.repository';
import { Sequelize } from 'sequelize';

const { EmotionReact } = db;

export class EmotionReactRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async countLikesOfVideo(videoId) {
    try {
      const data = await this.model.findOne({
        where: {
          videoId,
          isLike: true,
        },
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('videoId')), 'total'],
        ],
        group: 'videoId',
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countDisLikesOfVideo(videoId) {
    try {
      const data = await this.model.findOne({
        where: {
          videoId,
          isLike: false,
        },
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('videoId')), 'total'],
        ],
        group: 'videoId',
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new EmotionReactRepository(EmotionReact);
