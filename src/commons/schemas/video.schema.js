import Joi from 'joi';
import { sectionIdExist } from './section.schema';

// eslint-disable-next-line import/prefer-default-export
export const video = Joi.object({
  description: Joi.string().trim(),
  duration: Joi.number().positive().required(),
  thumbnailUrl: Joi.string().trim().uri(),
  title: Joi.string().trim().min(1).max(255).required(),
  url: Joi.string().trim().uri(),
  isLock: Joi.bool(),
  userId: Joi.string().trim().uuid().required(),
}).concat(sectionIdExist);
