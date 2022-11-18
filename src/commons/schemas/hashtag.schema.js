/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const hashtag = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
});
