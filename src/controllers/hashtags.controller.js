import { HashtagsService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages } from 'constants';

class HashtagsController {
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
      return Response.error(res, errors.WHILE_CREATE.format('hashtag'), 400);
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;

      if (id) {
        const data = await this.service.find(id);
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
        // eslint-disable-next-line no-else-return
      } else {
        // check on query page or limit valid
        // eslint-disable-next-line no-lonely-if
        if (page || limit) {
          const data = await this.service.findAll({
            // eslint-disable-next-line radix
            page: parseInt(page || pages.PAGE_DEFAULT),
            // eslint-disable-next-line radix
            limit: parseInt(limit || pages.LIMIT_DEFAULT),
          });

          return Response.success(
            res,
            { docs: data, pagination: data.pagination },
            httpCodes.STATUS_OK
          );
          // eslint-disable-next-line no-else-return
        } else {
          const data = await this.service.findAll();
          return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
        }
      }
    } catch (error) {
      return Response.error(res, errors.WHILE_GET.format('hashtag'), 400);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);
      if (data) {
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      }
      return Response.error(res, errors.WHILE_UPDATE.format('hashtag'), 400);
    } catch (error) {
      return Response.error(res, errors.WHILE_UPDATE.format('hashtag'), 400);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.WHILE_DELETE.format('hashtag'), 400);
    }
  }
}

export default new HashtagsController(HashtagsService);
