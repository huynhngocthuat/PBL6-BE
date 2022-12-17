import db from 'models';
import BaseRepository from 'commons/base.repository';

const { EmotionReact } = db;

export class EmotionReactRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new EmotionReactRepository(EmotionReact);
