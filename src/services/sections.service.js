import { SectionsRepository } from 'repositories';
import BaseService from './base.service';

class SectionsService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new SectionsService(SectionsRepository);
