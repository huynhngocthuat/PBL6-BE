/* eslint-disable no-console */
/* eslint-disable consistent-return */
import Response from '../helpers/response';
import jwt from '../helpers/jwt';
import { errors } from '../constants';

export default class AuthMiddleware {
  static isRequired(req, res, next) {
    const tokenBearer = req.header('Authorization');

    if (!tokenBearer) {
      return Response.error(res, {
        message: errors.TOKEN_NOT_FOUND,
      });
    }

    const [type, token] = tokenBearer.split(' ');

    if (type !== 'Bearer') {
      return Response.error(res, {
        message: errors.TOKEN_INVALID,
      });
    }

    const decoded = jwt.verify(token);

    if (!decoded) {
      return Response.error(res, {
        message: errors.TOKEN_INVALID,
      });
    }

    req.jwt = decoded;
    return next();
  }
}
