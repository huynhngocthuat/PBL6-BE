/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { CategoryTopicsService } from 'services';
import { errors } from 'constants';

export const categoryTopic = Joi.object({
  name: Joi.string().min(3).max(255).required(),
});

export const categoryTopicIdExist = Joi.object({
  categoryTopicId: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (categoryTopicId) => {
      try {
        const data = await CategoryTopicsService.findCategoryByCondition({
          id: categoryTopicId,
        });
        if (!data) {
          throw new Error(errors.NOT_EXIST.format('category topic'));
        }
      } catch (error) {
        if (
          String(error) ===
          `Error: ${errors.NOT_EXIST.format('category topic')}`
        ) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('category topic'));
        }
      }
    }),
});
