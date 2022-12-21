import { UsersService, oAuthAccessTokenService } from 'services';
import redisClient from 'configs/redis.config';
import Response from '../helpers/response';
import jwt from '../helpers/jwt';
import { errors, roles, httpCodes } from '../constants';

export default class AuthMiddleware {
  static async isRequired(req, res, next) {
    const tokenBearer = req.header('Authorization');

    if (!tokenBearer) {
      return Response.error(
        res,
        {
          message: errors.TOKEN_NOT_FOUND,
          code: httpCodes.STATUS_UNAUTHORIZED,
        },
        httpCodes.STATUS_UNAUTHORIZED
      );
    }

    const [type, token] = tokenBearer.split(' ');

    if (type !== 'Bearer') {
      return Response.error(
        res,
        {
          message: errors.TOKEN_INVALID,
          code: httpCodes.STATUS_UNAUTHORIZED,
        },
        httpCodes.STATUS_UNAUTHORIZED
      );
    }

    // token in black list
    const inBlackList = await redisClient.get(`revoke_${token}`);
    if (inBlackList) {
      return Response.error(
        res,
        {
          message: errors.TOKEN_REJECT,
          code: httpCodes.STATUS_UNAUTHORIZED,
        },
        httpCodes.STATUS_UNAUTHORIZED
      );
    }

    const decoded = jwt.verify(token);

    if (!decoded) {
      return Response.error(
        res,
        {
          message: errors.TOKEN_INVALID,
          code: httpCodes.STATUS_UNAUTHORIZED,
        },
        httpCodes.STATUS_UNAUTHORIZED
      );
    }

    // assign payload and token value
    req.jwt = decoded;
    req.token = token;

    return next();
  }

  static async isUser(req, res, next) {
    try {
      const { idOAuth } = req.jwt;

      const oAuth = await oAuthAccessTokenService.getOauthAccessTokenById(
        idOAuth
      );

      if (!oAuth) {
        throw new Error(errors.USER_NOT_AUTHENTICATED);
      }

      req.user = await UsersService.getUser(oAuth.userId);
      return next();
    } catch (error) {
      return Response.error(res, error);
    }
  }

  static isRole(...roles) {
    return async (req, res, next) => {
      try {
        const { idOAuth } = req.jwt;
        const oAuth = await oAuthAccessTokenService.getOauthAccessTokenById(
          idOAuth
        );
        if (!oAuth) {
          throw new Error(errors.USER_NOT_AUTHENTICATED);
        }
        const user = await UsersService.getUser(oAuth.userId);

        if (!roles.find((role) => user.role === role)) {
          throw new Error(errors.USER_NOT_AUTHORIZED);
        }

        req.user = user;

        return next();
      } catch (error) {
        let err = {};
        if (error.message === errors.USER_NOT_AUTHORIZED) {
          err = {
            message: `${error.message}. Your current permission can not do it`,
            errors: error.message,
            code: httpCodes.STATUS_FORBIDDEN,
          };
          return Response.error(res, err, httpCodes.STATUS_FORBIDDEN);
        }
        err = {
          message: `${error.message}. Access is denied due to invalid credentials`,
          errors: error.message,
          code: httpCodes.STATUS_UNAUTHORIZED,
        };
        return Response.error(res, err, httpCodes.STATUS_UNAUTHORIZED);
      }
    };
  }

  static isInstructor(req, res, next) {
    return AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE)(req, res, next);
  }

  static isAdmin(req, res, next) {
    return AuthMiddleware.isRole(roles.ADMIN_ROLE)(req, res, next);
  }
}
