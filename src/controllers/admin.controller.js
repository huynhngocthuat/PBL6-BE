import { AdminsService } from 'services';

class AdminsController {
  constructor(service) {
    this.service = service;
    this.statisticOverview = this.statisticOverview.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  statisticOverview(req, res) {
    try {
      console.log('oke');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminsController(AdminsService);
