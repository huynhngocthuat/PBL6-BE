import Response from "../helpers/response";
import jwt from "../helpers/jwt";
import { errors } from "../constants";

export default class AuthMiddleware {
  static isRequired(req, res, next) {
    const tokenBearer = req.header("Authorization");

    if (!tokenBearer) {
      return Response.error(res, {
        message: errors.TOKEN_NOT_FOUND,
      });
    }

    const token = tokenBearer.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token);
      req.jwt = decoded;

      console.log({ decoded });
      next();
    } catch (error) {
      return Response.error(res, {
        message: errors.TOKEN_INVALID,
      });
    }
  }
}
