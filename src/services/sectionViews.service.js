import { SectionViewsRepository } from 'repositories';
import BaseService from './base.service';

class SectionViewsService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new SectionViewsService(SectionViewsRepository);
