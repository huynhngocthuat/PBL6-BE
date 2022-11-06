import db from 'models';
import BaseRepository from 'commons/base.repository';

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
}

export default new SectionsRepository(Section);
