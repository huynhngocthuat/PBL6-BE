import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const videoComment = Joi.object({
  userId: Joi.string().trim().uuid().required(),
  content: Joi.string().trim(),
  videoId: Joi.string().trim().uuid().required(),
});
