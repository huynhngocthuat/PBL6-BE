/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const course = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  price: Joi.number().positive().min(0).required(),
  description: Joi.string().trim().min(1),
  userId: Joi.string().trim().uuid().required,
  categoryId: Joi.string().trim().uuid().required,
});
