import TotalDuration from 'dtos/totalDuration';
import { SectionsRepository } from 'repositories';
import { json } from 'utils';
import BaseService from './base.service';

class SectionsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * Get list section with condition
   * @param {object} condition is condition to find sections, e.g, {id: sectionId,}
   * @returns {object} data about model section is returned from repository
   */
  async findSectionByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get list video of section
   * @param {uuid} sectionId is id of section, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @param {boolean} isDeleted is optional param to get with video was deleted or not, default value: false
   * @returns {array} list object video of section
   */
  async findVideosBySection(sectionId, isDeleted = false) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: sectionId },
        isDeleted,
        { association: 'videos' }
      );

      const { videos } = json(data);

      return videos;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Count all sections not deleted yet of course
   * @param {string} courseId is id of course, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {number} is number represents the total record section of course
   */
  async countSectionsOfCourse(courseId) {
    try {
      return this.repo.countSectionsOfCourse(courseId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async sumDurationOfAllVideosInSection(sectionId) {
    try {
      const data = await this.repo.sumDurationOfAllVideosInSection(sectionId);
      const totalDuration = {};

      // if data is null assign 0
      if (!data) {
        totalDuration.total = 0;
      } else {
        totalDuration.total = +data[0].sum;
      }

      return new TotalDuration(totalDuration);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SectionsService(SectionsRepository);
