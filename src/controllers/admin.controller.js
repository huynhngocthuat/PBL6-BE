import { AdminService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages, actions } from 'constants';

class AdminController {
  constructor(service) {
    this.service = service;
    this.statisticOverview = this.statisticOverview.bind(this);
    this.getAllSoldCourses = this.getAllSoldCourses.bind(this);
    this.activationUser = this.activationUser.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);
  }

  async statisticOverview(req, res) {
    try {
      const data = await this.service.statisticOverview();

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        { message: errors.ERR_WHILE_STATISTIC_OVERVIEW },
        400
      );
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

      return Response.success(
        res,
        { docs: data.soldCourses, pagination: data.pagination },
        httpCodes.STATUS_OK
      );
    } catch (error) {
      return Response.error(
        res,
        { message: errors.ERR_WHILE_GET_ALL_SOLD_COURSES },
        400
      );
    }
  }

  async activationUser(req, res) {
    try {
      const { id } = req.params;
      const { action } = req.body;
      let isActivated;

      if (action === actions.ACTION_ACTIVATED) {
        isActivated = true;
      } else {
        isActivated = false;
      }

      const data = await this.service.activatedUser(id, isActivated);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        { message: errors.ERR_WHILE_ACTIVATION_USER },
        400
      );
    }
  }

  async getUserDetail(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.getUserDetail(id);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      console.log(error);
      return Response.error(res, {
        message: errors.ERR_WHILE_GET_INFOR_DETAIL_OF_USER,
      });
    }
  }
}

export default new AdminController(AdminService);
