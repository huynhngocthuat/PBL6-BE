import { AdminService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors } from 'constants';

class AdminController {
  constructor(service) {
    this.service = service;
    this.statisticOverview = this.statisticOverview.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  async statisticOverview(req, res) {
    try {
      const data = await this.service.statisticOverview();

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.ERR_WHILE_STATISTIC_OVERVIEW, 400);
    }
  }
}

export default new AdminController(AdminService);
