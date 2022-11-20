import Joi from 'joi';

export const id = Joi.object({
  id: Joi.string().required().guid({ version: 'uuidv4' }),
});

// TODO: add more schemas
export const id2 = Joi.object({
  id2: Joi.number().required(),
});
