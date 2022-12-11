import Joi from 'joi';
import { userIdExist } from './user.schema';
import { videoIdExist } from './video.schema';

// eslint-disable-next-line import/prefer-default-export
export const videoView = Joi.object({
  lastDuration: Joi.number().positive().required(),
  lastestViewDate: Joi.date().required(),
  userId: Joi.string().trim().uuid().required(),
  videoId: Joi.string().trim().uuid().required(),
})
  .concat(userIdExist)
  .concat(videoIdExist);
