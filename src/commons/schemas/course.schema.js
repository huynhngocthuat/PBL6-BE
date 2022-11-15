/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { CoursesService } from 'services';
import { errors } from 'constants';
import { categoryTopicIdExist } from './categoryTopic.schema';

export const course = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  price: Joi.number().positive().min(0).required(),
  thumbnailUrl: Joi.string().trim().uri(),
  description: Joi.string().trim().min(1),
  userId: Joi.string().trim().uuid().required(),
  hashtags: Joi.array().items(Joi.string()),
}).concat(categoryTopicIdExist);

export const courseIdExist = Joi.object({
  courseId: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (courseId) => {
      try {
        const data = await CoursesService.findCourseByCondition({
          id: courseId,
        });

        if (!data) {
          throw new Error(errors.NOT_EXIST.format('course'));
        }
      } catch (error) {
        if (String(error) === `Error: ${errors.NOT_EXIST.format('course')}`) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('course'));
        }
      }
    }),
});
