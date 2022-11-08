import { VideosRepository } from 'repositories';
import { InstructorResponse } from 'commons/responses/auth';
import { json } from 'utils';
import BaseService from './base.service';

class VideosService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * Get infor of instructor was uploaded video
   * @param {uuid} videoId is id of video, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {object} is object of instructor
   */
  async getInstructorUploadVideo(videoId) {
    try {
      const data = await this.repo.findOneByCondition({ id: videoId }, false, {
        association: 'user',
      });

      const { user } = json(data);

      return new InstructorResponse(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideosService(VideosRepository);
