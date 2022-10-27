/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const id = Joi.object({
  id: Joi.string().trim().uuid().required(),
});
