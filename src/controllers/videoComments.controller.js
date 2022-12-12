import { VideoCommentsService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages } from 'constants';

class VideoCommentsController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  async create(req, res) {
    try {
      console.log(req.body);
      const videoComment = await this.service.create(req.body);
      return Response.success(
        res,
        { docs: videoComment },
        httpCodes.STATUS_OK
      );
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_CREATE.format('video comment'),
        400
      );
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
      return Response.error(
        res,
        errors.WHILE_GET.format('video comment'),
        400
      );
    }
  }

}

export default new VideoCommentsController(VideoCommentsService);
