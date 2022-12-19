import db from 'models';
import BaseRepository from 'commons/base.repository';
import { Sequelize } from 'sequelize';

const { VideoView } = db;

export class VideoViewsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getViewOfVideo(videoId) {
    try {
      const data = await this.model.findOne({
        where: {
          videoId,
        },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('countView')), 'total'],
        ],
        group: 'videoId',
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoViewsRepository(VideoView);
