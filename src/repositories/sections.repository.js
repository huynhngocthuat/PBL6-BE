import db from 'models';
import BaseRepository from 'commons/base.repository';
import { QueryTypes } from 'sequelize';

const { Section } = db;

export class SectionsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async countSectionsOfCourse(courseId, isDeleted = false) {
    try {
      const total = await this.model.count({
        where: {
          courseId,
        },
        paranoid: !isDeleted,
      });

      return total;
    } catch (error) {
      throw new Error(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sumDurationOfAllVideosInSection(sectionId) {
    try {
      const query = `SELECT 
                          sum(v.duration) 
                     FROM 
                          "Sections" s INNER JOIN "Videos" v on s."id"  = v."sectionId" 
                     WHERE s.id = :sectionId `;

      const data = await db.sequelize.query(query, {
        logging: console.log,
        replacements: { sectionId },
        type: QueryTypes.SELECT,
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SectionsRepository(Section);
