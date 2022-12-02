import db from 'models';
import BaseRepository from 'commons/base.repository';

const { VideoView } = db;

export class VideoViewsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new VideoViewsRepository(VideoView);
