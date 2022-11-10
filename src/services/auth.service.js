import {
  SignUpResponse,
  SignInResponse,
  GetMeResponse,
} from 'commons/responses/auth';

import jwt from 'helpers/jwt';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { errors, infors } from 'constants';
import oAuthAccessTokenService from './oAuthAccessToken.service';
import UsersService from './users.service';

class AuthService {
  constructor() {
    this.usersService = UsersService;
    this.oAuthService = oAuthAccessTokenService;
  }

  async signUp(data) {
    const { password } = data;

    const saltLength = 10;
    const hashedPassword = await bcrypt.hash(password, saltLength);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return new SignUpResponse(user);
  }

  async signIn({ email, password }) {
    const user = await this.usersService.getUserByEmail(email);

    if (user.isActivated === false) {
      throw new Error(errors.USER_NOT_CONFIRMED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error(errors.PASSWORD_INCORRECT);
    }

    const oAuth = await this.oAuthService.createOauthAccessToken({
      userId: user.id,
      refreshToken: uuid(),
    });

    const token = jwt.sign({
      idOAuth: oAuth.id,
    });

    const refreshToken = jwt.refreshSign({
      refresh: oAuth.refreshToken,
    });

    return new SignInResponse({
      token,
      refreshToken,
    });
  }

  async logout(idOAuth) {
    try {
      await this.oAuthService.deleteOauthAccessToken(idOAuth);
      return infors.LOGOUT_SUCCESS;
    } catch (error) {
      throw new Error(errors.LOGOUT_FAILED);
    }
  }

  async confirmEmail(confirmToken) {
    try {
      const user = await this.usersService.confirmEmail(confirmToken);

      const oAuth = await this.oAuthService.createOauthAccessToken({
        userId: user.id,
        refreshToken: uuid(),
      });

      const token = jwt.sign({
        idOAuth: oAuth.id,
      });

      const refreshToken = jwt.refreshSign({
        refreshToken: oAuth.refreshToken,
      });

      return new SignInResponse({
        token,
        refreshToken,
      });
    } catch (error) {
      throw new Error(errors.CONFIRM_EMAIL_FAILED);
    }
  }

  async refreshToken(jwtRefreshToken) {
    try {
      const decoded = jwt.refreshVerify(jwtRefreshToken);

      if (!decoded) {
        throw new Error(errors.TOKEN_INVALID);
      }

      const { refresh } = decoded;

      const oAuth = await this.oAuthService.getOauthAccessTokenByRefreshToken(
        refresh
      );

      if (!oAuth) {
        throw new Error(errors.OAUTH_ACCESS_TOKEN_NOT_FOUND);
      }

      const token = jwt.sign({
        idOAuth: oAuth.id,
      });

      return new SignInResponse({
        token,
        refreshToken: jwtRefreshToken,
      });
    } catch (error) {
      throw new Error(errors.REFRESH_TOKEN_FAILED);
    }
  }

  async getMe(idOAuth) {
    try {
      const oAuth = await this.oAuthService.getOauthAccessTokenById(idOAuth);

      if (!oAuth) {
        throw new Error(errors.TOKEN_INVALID);
      }

      const user = await this.usersService.getUserById(oAuth.userId);

      // FIXME: Get user's detail
      return new GetMeResponse(user);
    } catch (error) {
      throw new Error(errors.GET_ME_FAILED);
    }
  }
}

export default new AuthService();
