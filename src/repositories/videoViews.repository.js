import db from 'models';
import BaseRepository from 'commons/base.repository';
import { QueryTypes, Sequelize } from 'sequelize';

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

  // eslint-disable-next-line class-methods-use-this
  async sumDurationOfUserForAllVideoInSection(sectionId, userId) {
    try {
      const query = `SELECT 
                          sum(vv."highestDuration") AS total
                     FROM "VideoViews" vv 
                        INNER JOIN "Videos" v ON vv."videoId"  = v.id 
                        INNER JOIN "Sections" s on s.id  = v."sectionId" 
                    WHERE 
                        s.id = :sectionId and vv."userId" = :userId`;

      const data = await db.sequelize.query(query, {
        logging: console.log,
        replacements: { sectionId, userId },
        type: QueryTypes.SELECT,
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoViewsRepository(VideoView);
