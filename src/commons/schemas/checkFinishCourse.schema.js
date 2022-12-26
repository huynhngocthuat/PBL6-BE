/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { courseIdExist } from './course.schema';
import { userIdExist } from './user.schema';

export const checkFinishCourse = Joi.object({})
  .concat(userIdExist)
  .concat(courseIdExist);
