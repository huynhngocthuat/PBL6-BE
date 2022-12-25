import { VideosRepository } from 'repositories';
import { InstructorResponse } from 'commons/responses/auth';
import { json } from 'utils';
import VideoResponse from 'commons/responses/video.response';
import BaseService from './base.service';
// eslint-disable-next-line import/no-cycle
import videoViewsService from './videoViews.service';
import videoCommentsService from './videoComments.service';
import emotionReactsService from './emotionReacts.service';

class VideosService extends BaseService {
  constructor(
    repo,
    { videoViewsService, videoCommentsService, emotionReactsService }
  ) {
    super(repo);
    this.videoViewsService = videoViewsService;
    this.videoCommentsService = videoCommentsService;
    this.emotionReactsService = emotionReactsService;
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

  async getViewOfVideo(videoId) {
    try {
      const data = await this.videoViewsService.getViewOfVideo(videoId);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getVideoById(videoId) {
    try {
      const data = await this.find(videoId);
      const video = json(data);
      const viewVideo = await this.getViewOfVideo(videoId);
      const totalComment = await this.videoCommentsService.countCommentOfVideo(
        videoId
      );
      const totalLike =
        // eslint-disable-next-line no-await-in-loop
        await this.emotionReactsService.countLikesOfVideo(videoId);
      const totalDisLike =
        // eslint-disable-next-line no-await-in-loop
        await this.emotionReactsService.countDisLikesOfVideo(videoId);

      return new VideoResponse({
        ...video,
        ...viewVideo,
        ...totalComment,
        ...totalLike,
        ...totalDisLike,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getListVideo(pagination) {
    try {
      const data = await this.findAll(pagination);

      const listVideo = json(data);
      const response = {
        data: [],
        pagination: data.pagination,
      };

      for (let i = 0; i < listVideo.length; i += 1) {
        const videoId = listVideo[i].id;
        // eslint-disable-next-line no-await-in-loop
        const viewVideo = await this.getViewOfVideo(videoId);
        const totalComment =
          // eslint-disable-next-line no-await-in-loop
          await this.videoCommentsService.countCommentOfVideo(videoId);
        const totalLike =
          // eslint-disable-next-line no-await-in-loop
          await this.emotionReactsService.countLikesOfVideo(videoId);
        const totalDisLike =
          // eslint-disable-next-line no-await-in-loop
          await this.emotionReactsService.countDisLikesOfVideo(videoId);

        response.data = [
          ...response.data,
          new VideoResponse({
            ...listVideo[i],
            ...viewVideo,
            ...totalComment,
            ...totalLike,
            ...totalDisLike,
          }),
        ];
      }

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSectionOfVideo(videoId) {
    try {
      const data = await this.repo.findOneByCondition(
        {
          id: videoId,
        },
        false,
        {
          association: 'section',
        }
      );

      if (json(data)) {
        return json(data).section;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default new VideosService(VideosRepository, {
  videoViewsService,
  videoCommentsService,
  emotionReactsService,
});
