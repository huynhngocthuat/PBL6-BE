import { videoViewsRepository } from 'repositories';
import { json } from 'utils';
import logger from 'configs/winston.config';
import { errors } from 'constants';
import ViewVideo from 'dtos/viewVideo';
import BaseService from './base.service';

class VideoViewsService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async updateViewOfVideo(videoView) {
    const { userId, videoId } = videoView;
    try {
      const data = await this.repo.findOneByCondition({ userId, videoId });
      const dataJson = json(data);

      if (data) {
        const res = await this.repo.updateByPk(dataJson.id, {
          countView: dataJson.countView + 1,
          ...videoView,
        });
        const videoViewSaved = json(res);

        return { videoViewSaved, type: 'update' };
        // eslint-disable-next-line no-else-return
      } else {
        const res = await this.repo.create({ ...videoView, countView: 1 });
        const videoViewSaved = json(res);

        return { videoViewSaved, type: 'create' };
      }
    } catch (error) {
      logger.error(`${errors.ERR_WHILE_UPDATE_VIEW_AT_SERVICE} - ${error}`);
      throw new Error(error);
    }
  }

  async getVideoView(videoId, userId) {
    try {
      const data = await this.repo.findOneByCondition({ videoId, userId });

      return json(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getViewOfVideo(videoId) {
    try {
      const data = await this.repo.getViewOfVideo(videoId);
      let viewVideo = {};

      // if data is null assign 0
      if (!data) {
        viewVideo.total = 0;
      } else {
        viewVideo = json(data);
        viewVideo.total = +viewVideo.total;
      }

      return new ViewVideo(viewVideo);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoViewsService(videoViewsRepository);
