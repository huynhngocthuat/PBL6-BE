/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { courseIdExist } from './course.schema';

export const section = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
}).concat(courseIdExist);

export const sectionUpdate = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
});
