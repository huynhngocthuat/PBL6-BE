import * as Schemas from "commons/schemas";
import Response from "helpers/response";

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
