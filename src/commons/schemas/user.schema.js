import { errors, roles } from 'constants';
import Joi from 'joi';
import { UsersService } from 'services';

export const avatar = Joi.object({
  avatarUrl: Joi.string().required(),
});

export const updateProfile = Joi.object({
  fullName: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  occupation: Joi.string(),
  dateOfBirth: Joi.date(),
  identityImageUrl: Joi.string(),
});

export const userIdExist = Joi.object({
  userId: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (userId) => {
      try {
        const data = await UsersService.findUserByCondition({
          id: userId,
          role: {
            $or: [roles.INSTRUCTOR_ROLE, roles.USER_ROLE],
          },
        });
        if (!data) {
          throw new Error(errors.NOT_EXIST.format('user'));
        }
      } catch (error) {
        if (String(error) === `Error: ${errors.NOT_EXIST.format('user')}`) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('user'));
        }
      }
    }),
});
