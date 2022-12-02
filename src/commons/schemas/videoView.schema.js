import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const videoView = Joi.object({
  lastDuration: Joi.number().positive().required(),
  lastestViewDate: Joi.date().required(),
  userId: Joi.string().trim().uuid().required(),
  videoId: Joi.string().trim().uuid().required(),
});
