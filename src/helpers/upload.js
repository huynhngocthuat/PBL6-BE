import streamifier from 'streamifier';
import cloudinary from 'configs/cloudinary.config';
import logger from 'configs/winston.config';
import { infors } from 'constants';

export function streamUpload(option, file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      option,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

export async function upload(option, file) {
  try {
    const result = await streamUpload(option, file);
    logger.info(infors.UPLOAD_FILE_TO_CLOUD_SUCCESS);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error));
  }
}

export function getPublicIdOnUrl(url) {
  const arr = url.split('/');
  const publicId = arr[arr.length - 1].split('.')[0];

  return publicId;
}
