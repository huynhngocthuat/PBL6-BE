import { SubscribesRepository } from 'repositories';
import BaseService from './base.service';

class SubscribesService extends BaseService {
  constructor(repo) {
    super(repo);
  }
}

export default new SubscribesService(SubscribesRepository);
