import Joi from 'joi';
import { emailExists, emailNotExists } from './email.schema';

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const password = Joi.string().regex(regexPassword).required().messages({
  'string.pattern.base':
    'New password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
});

export const register = Joi.object({
  fullName: Joi.string().required(),
  password,
}).concat(emailNotExists);

export const login = Joi.object({
  password,
}).concat(emailExists);

export const confirmToken = Joi.object({
  confirmToken: Joi.string().required(),
});

export const refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
});

export const verifyCode = Joi.object({
  verifyCode: Joi.number().required(),
  email: Joi.string().email().required(),
});

export const resetPassword = Joi.object({
  verifyCode: Joi.number().required(),
  email: Joi.string().email().required(),
  password,
});

export const changePassword = Joi.object({
  oldPassword: password,
  newPassword: Joi.string()
    .required()
    .regex(regexPassword)
    .not(Joi.ref('oldPassword'))
    .messages({
      'string.pattern.base':
        'New password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
      'any.only': 'New password must be different from old password',
    }),
});
