/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
import { CoursesService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages } from 'constants';
import logger from 'configs/winston.config';

class CoursesController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
  }

  async create(req, res) {
    try {
      const data = await this.service.create(req.body);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error(`${errors.WHILE_CREATE.format('course')} - ${error}`);
      return Response.error(res, errors.WHILE_CREATE.format('course'), 400);
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;

      if (id) {
        const data = await this.service.find(id);
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      } else {
        // check on query page or limit valid
        if (page || limit) {
          const data = await this.service.findAll({
            page: parseInt(page || pages.PAGE_DEFAULT),
            limit: parseInt(limit || pages.LIMIT_DEFAULT),
          });

          return Response.success(
            res,
            { docs: data, pagination: data.pagination },
            httpCodes.STATUS_OK
          );
        } else {
          const data = await this.service.findAll();
          return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
        }
      }
    } catch (error) {
      return Response.error(res, errors.WHILE_GET.format('course'), 400);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);

      if (data) {
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      }
      return Response.error(res, errors.WHILE_UPDATE.format('course'), 400);
    } catch (error) {
      return Response.error(res, errors.WHILE_UPDATE.format('course'), 400);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.WHILE_DELETE.format('course'), 400);
    }
  }
}

export default new CoursesController(CoursesService);
