/* eslint-disable no-useless-constructor */
import db from 'models';
import BaseRepository from 'commons/base.repository';

const { VideoComment } = db;

export class VideoCommentsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new VideoCommentsRepository(VideoComment);
