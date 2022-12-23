import TotalPurchaser from 'dtos/totalPurchaser';
import { SubscribesRepository } from 'repositories';
import BaseService from './base.service';

class SubscribesService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  async countAllSubcriber() {
    try {
      const data = await this.repo.countAllSubcriber();
      const totalPurchaser = {};

      // if data is null assign 0
      if (!data) {
        totalPurchaser.total = 0;
      } else {
        totalPurchaser.total = data;
      }

      return new TotalPurchaser(totalPurchaser);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SubscribesService(SubscribesRepository);
