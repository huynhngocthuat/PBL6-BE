/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { CoursesService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors } from 'constants';
import { upload } from 'helpers/upload';
import logger from 'configs/winston.config';

class CoursesController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    console.log(req);
    try {
      const { file } = req;

      const image = await upload(
        {
          resource_type: 'image',
          folder: `${req.body.userId}/${req.body.categoryTopicId}`,
        },
        file
      );

      if (image) {
        req.body.thumbnailUrl = image.secure_url;
      }

      const data = await this.service.create(req.body);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error(`${errors.WHILE_CREATE.format('course')} - ${error}`);
      return Response.error(res, errors.WHILE_CREATE.format('course'), 400);
    }
  }
}

export default new CoursesController(CoursesService);
