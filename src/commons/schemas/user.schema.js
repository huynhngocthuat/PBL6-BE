import Joi from 'joi';

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

export const id = Joi.object({
  id: Joi.string().required(),
});
