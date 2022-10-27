import { upload } from 'helpers/upload';
import { httpCodes } from 'constants';
import Response from 'helpers/response';

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
      const url = image.secure_url;

      return Response.success(res, { docs: { url } }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, error, 400);
    }
  }

  /* eslint-disable class-methods-use-this */
  async uploadVideo(req, res) {
    const { file } = req;

    const video = await upload(
      {
        resource_type: 'video',
      },
      file
    );

    const url = video.secure_url;

    return Response.success(res, { docs: { url } }, httpCodes.STATUS_OK);
  }
}

export default new UploadController();
