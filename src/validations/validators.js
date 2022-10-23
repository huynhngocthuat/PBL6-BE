import * as Schemas from "commons/schemas";
import Response from "helpers/response";
import { validate as uuidValidate } from "uuid";
import { messages } from "constants";

export function Validators(validator) {
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

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

export function ValidatorId(req, res, next) {
  const id = req.params.id;
  const isUuid = uuidValidate(id);
  if (isUuid) {
    next();
    return;
  }

  return Response.error(res, {
    message: messages.INVALID_ID,
  });
}
