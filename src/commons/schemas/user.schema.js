import Joi from 'joi';

export const avatar = Joi.object({
  avatarUrl: Joi.string().required(),
});

// TODO: EDIT SCHEMA
export const updateUserInfo = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});
