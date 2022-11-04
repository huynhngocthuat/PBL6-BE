import db from 'models';
import BaseRepository from 'commons/base.repository';

const { Video } = db;

export class VideosRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new VideosRepository(Video);
