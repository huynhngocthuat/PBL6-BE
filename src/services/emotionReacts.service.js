import { EmotionReactsRepository } from 'repositories';
import BaseService from './base.service';

class EmotionReactsService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new EmotionReactsService(EmotionReactsRepository);
