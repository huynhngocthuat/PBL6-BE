/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { SectionsService } from 'services';
import { errors } from 'constants';
import { courseIdExist } from './course.schema';

export const section = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
}).concat(courseIdExist);

export const sectionUpdate = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
});

export const sectionIdExist = Joi.object({
  sectionId: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (sectionId) => {
      try {
        const data = await SectionsService.findSectionByCondition({
          id: sectionId,
        });
        if (!data) {
          throw new Error(errors.NOT_EXIST.format('section'));
        }
      } catch (error) {
        if (String(error) === `Error: ${errors.NOT_EXIST.format('section')}`) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('section'));
        }
      }
    }),
});
