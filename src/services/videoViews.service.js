import { videoViewsRepository } from 'repositories';
import { json } from 'utils';
import logger from 'configs/winston.config';
import { errors } from 'constants';
import ViewVideo from 'dtos/viewVideo';
import TotalDuration from 'dtos/totalDuration';
import BaseService from './base.service';
// eslint-disable-next-line import/no-cycle, no-unused-vars
import VideosService from './videos.service';
import SectionsService from './sections.service';
import SectionViewsService from './sectionViews.service';

class VideoViewsService extends BaseService {
  constructor(repo, { VideosService, SectionsService, SectionViewsService }) {
    super(repo);
    this.videosService = VideosService;
    this.sectionsService = SectionsService;
    this.sectionViewsService = SectionViewsService;
  }

  async updateViewOfVideo(videoView) {
    const { userId, videoId } = videoView;

    try {
      const data = await this.repo.findOneByCondition({ userId, videoId });
      const dataJson = json(data);
      let type = '';
      let res;

      if (data) {
        type = 'update';
        const oldLastDuration = +dataJson.lastDuration.toFixed(1);
        const newLastDuration = +videoView.lastDuration.toFixed(1);

        // eslint-disable-next-line no-param-reassign
        videoView.highestDuration =
          newLastDuration > oldLastDuration ? newLastDuration : oldLastDuration;

        res = await this.repo.updateByPk(dataJson.id, {
          countView: dataJson.countView + 1,
          ...videoView,
        });
      } else {
        type = 'create';

        res = await this.repo.create({
          ...videoView,
          countView: 1,
          highestDuration: videoView.lastDuration,
        });
      }

      const videoViewSaved = json(res);

      const section = await this.videosService.getSectionOfVideo(videoId);
      const { totalDuration } =
        await this.sectionsService.sumDurationOfAllVideosInSection(section.id);

      // total duration of user in section
      const totalDurationOfVideo =
        await this.sumDurationOfUserForAllVideoInSection(section.id, userId);

      // if totalDurationOfVideo >= 80% totalDuration of section, user finish section
      if (totalDurationOfVideo.totalDuration >= 0.8 * totalDuration) {
        const currentSectionView =
          await this.sectionViewsService.findOneByCondition({
            sectionId: section.id,
            userId,
          });

        if (!currentSectionView) {
          const sectionView = {
            sectionId: section.id,
            userId,
          };

          this.sectionViewsService.create(sectionView);
        }
      }

      return { videoViewSaved, type };
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

  async sumDurationOfUserForAllVideoInSection(sectionId, userId) {
    try {
      const data = await this.repo.sumDurationOfUserForAllVideoInSection(
        sectionId,
        userId
      );
      let totalDuration = {};
      // if data is null assign 0
      if (!data) {
        totalDuration.total = 0;
      } else {
        totalDuration = json(data);
        totalDuration.total = +totalDuration[0].total;
      }

      return new TotalDuration(totalDuration);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new VideoViewsService(videoViewsRepository, {
  VideosService,
  SectionsService,
  SectionViewsService,
});
