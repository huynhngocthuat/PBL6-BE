import Joi from 'joi';
import { VideosService } from 'services';
import { errors } from 'constants';
import { sectionIdExist } from './section.schema';

export const video = Joi.object({
  description: Joi.string().trim(),
  duration: Joi.number().positive().required(),
  thumbnailUrl: Joi.string().trim().uri(),
  title: Joi.string().trim().min(1).max(255).required(),
  url: Joi.string().trim().uri(),
  isLock: Joi.bool(),
  userId: Joi.string().trim().uuid().required(),
}).concat(sectionIdExist);

export const videoIdExist = Joi.object({
  videoId: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (userId) => {
      try {
        const data = await VideosService.findOneByCondition({
          id: userId,
        });
        if (!data) {
          throw new Error(errors.NOT_EXIST.format('video'));
        }
      } catch (error) {
        if (String(error) === `Error: ${errors.NOT_EXIST.format('video')}`) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('video'));
        }
      }
    }),
});
