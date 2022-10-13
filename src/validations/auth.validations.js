import Joi from "joi";
import Response from "helpers/response";

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const schemeValidate = schema.validate(req.body);

  if (schemeValidate.error) {
    return Response.error(res, {
      message: schemeValidate.error.details[0].message,
    });
  }

  req.user = schemeValidate.value;

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  if (schema.validate(req.body).error) {
    return Response.error(res, {
      message: schema.validate(req.body).error.details[0].message,
    });
  }

  req.login = schema.validate(req.body).value;

  next();
};

export const authValidation = {
  registerValidation,
  loginValidation,
};
