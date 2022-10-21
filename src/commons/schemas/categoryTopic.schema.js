import Joi from "joi";

export const categoryTopic = Joi.object({
  name: Joi.string().min(3).max(255).required(),
});
