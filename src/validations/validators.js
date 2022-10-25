import * as Schemas from 'commons/schemas';
import Response from 'helpers/response';
import { validate as uuidValidate } from 'uuid';
import { messages } from 'constants';

export function ValidatorBody(validator) {
  // eslint-disable-next-line no-prototype-builtins
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  // eslint-disable-next-line consistent-return, func-names
  return async function (req, res, next) {
    try {
      const validated = await Schemas[validator].validateAsync(req.body);
      req.body = validated;

      next();
    } catch (err) {
      return Response.error(res, {
        message: err.message,
      });
    }
  };
}

export function ValidatorParams(validator) {
  // eslint-disable-next-line no-prototype-builtins
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  // eslint-disable-next-line consistent-return
  return async function validate(req, res, next) {
    try {
      const validated = await Schemas[validator].validateAsync(req.params);
      req.params = validated;

      next();
    } catch (err) {
      return Response.error(res, {
        message: err.message,
      });
    }
  };
}

export function ValidatorId(req, res, next) {
  const { id } = req.params;
  const isUuid = uuidValidate(id);
  if (isUuid) {
    next();
    return;
  }

  Response.error(res, {
    message: messages.INVALID_ID,
  });
}
