import Joi from 'joi';
import { UsersService } from 'services';
import { errors } from 'constants';

export const emailNotExists = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email()
    .external(async (email) => {
      try {
        const user = await UsersService.getUserByEmail(email);
        if (user) {
          throw new Error(errors.EMAIL_EXISTS.format(email));
        }
      } catch (error) {
        throw new Error(error);
      }
    }),
});

export const emailExists = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email()
    .external(async (email) => {
      try {
        const user = await UsersService.getUserByEmail(email);
        if (!user) {
          throw new Error(errors.EMAIL_NOT_EXISTS.format(email));
        }
      } catch (error) {
        throw new Error(error);
      }
    }),
});

export const email = Joi.object({
  email: Joi.string().min(6).required().email(),
});
