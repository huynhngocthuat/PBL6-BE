/* eslint-disable no-useless-constructor */
import db from 'models';
import BaseRepository from 'commons/base.repository';
import { Sequelize } from 'sequelize';

const { VideoComment } = db;

export class VideoCommentsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async countCommentOfVideo(videoId) {
    try {
      const data = await this.model.findOne({
        where: {
          videoId,
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

export default new VideoCommentsRepository(VideoComment);
