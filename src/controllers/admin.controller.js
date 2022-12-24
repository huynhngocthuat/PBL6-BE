import { AdminService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages } from 'constants';

class AdminController {
  constructor(service) {
    this.service = service;
    this.statisticOverview = this.statisticOverview.bind(this);
    this.getAllSoldCourses = this.getAllSoldCourses.bind(this);
  }

  async statisticOverview(req, res) {
    try {
      const data = await this.service.statisticOverview();

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.ERR_WHILE_STATISTIC_OVERVIEW, 400);
    }
  }

  async getAllSoldCourses(req, res) {
    try {
      const { page, limit } = req.query;

      const pagination = {
        // eslint-disable-next-line radix
        page: parseInt(page || pages.PAGE_DEFAULT),
        // eslint-disable-next-line radix
        limit: parseInt(limit || pages.LIMIT_DEFAULT),
      };

      const data = await this.service.getAllSoldCourses(pagination);

      console.log(data);
      return Response.success(
        res,
        { docs: data.soldCourses, pagination: data.pagination },
        httpCodes.STATUS_OK
      );
    } catch (error) {
      return Response.error(res, errors.ERR_WHILE_GET_ALL_SOLD_COURSES, 400);
    }
  }
}

export default new AdminController(AdminService);
