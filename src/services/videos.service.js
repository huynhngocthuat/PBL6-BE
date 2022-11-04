import { VideosRepository } from 'repositories';
import BaseService from './base.service';

class VideosService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new VideosService(VideosRepository);
