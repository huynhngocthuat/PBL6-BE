import { videoViewsRepository } from 'repositories';
import { json } from 'utils';
import logger from 'configs/winston.config';
import { errors } from 'constants';
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
        const videoViewUpdate = {
          countView: dataJson.countView + 1,
          ...videoView,
        };

        const res = await this.repo.updateByPk(dataJson.id, videoViewUpdate);

        return { res, type: 'update' };
        // eslint-disable-next-line no-else-return
      } else {
        const res = await this.repo.create({ ...videoView, countView: 1 });

        return { res, type: 'create' };
      }
    } catch (error) {
      logger.error(`${errors.ERR_WHILE_UPDATE_VIEW_AT_SERVICE} - ${error}`);
      throw new Error(error);
    }
  }
}

export default new VideoViewsService(videoViewsRepository);
