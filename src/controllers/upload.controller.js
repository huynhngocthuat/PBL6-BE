import { upload } from 'helpers/upload';
import { httpCodes, errors } from 'constants';
import Response from 'helpers/response';
import { setKey } from 'helpers/redis';
import logger from 'configs/winston.config';

class UploadController {
  constructor() {
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async uploadImage(req, res) {
    const { file } = req;
    try {
      const image = await upload(
        {
          resource_type: 'image',
        },
        file
      );

      const key = `publicId_${image.public_id}`;
      const data = {
        publicId: image.public_id,
        url: image.secure_url,
        type: 'image',
      };

      await setKey(0, key, JSON.stringify(data));

      // use db 1 in Redis
      // await redisClient.select(1);
      // await redisClient.set(data.id, data.url);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error('Error while upload image [upload-controller]:', error);
      return Response.error(
        res,
        {
          message: errors.ERR_WHILE_UPLOAD_FILE,
        },
        400
      );
    }
  }

  /* eslint-disable class-methods-use-this */
  async uploadVideo(req, res) {
    const { file } = req;

    try {
      const video = await upload(
        {
          resource_type: 'video',
        },
        file
      );

      const key = `publicId_${video.public_id}`;
      const data = {
        publicId: video.public_id,
        url: video.secure_url,
        type: 'video',
      };

      await setKey(0, key, JSON.stringify(data));

      // use db 1 in Redis
      // await redisClient.select(1);
      // await redisClient.set(data.id, data.url);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error('Error while upload image [upload-controller]:', error);
      return Response.error(
        res,
        {
          message: errors.ERR_WHILE_UPLOAD_FILE,
        },
        400
      );
    }
  }
}

export default new UploadController();
