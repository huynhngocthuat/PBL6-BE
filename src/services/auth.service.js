import {
  SignUpResponse,
  SignInResponse,
  GetMeResponse,
} from 'commons/responses/auth';

import jwt from 'helpers/jwt';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { errors, infors, time } from 'constants';
import { randomVerifiedCode } from 'utils';
import { sendVerifyCode } from 'helpers/mail';
import oAuthAccessTokenService from './oAuthAccessToken.service';
import UsersService from './users.service';

const saltLength = 10;

const checkVerifyCode = ({ user, verifyCode }) => {
  if (user.verifyCode !== verifyCode) {
    throw new Error(errors.VERIFY_CODE_INCORRECT);
  }

  const now = new Date();
  const sendAt = new Date(user.verifyCodeSendAt);
  const diff = now.getTime() - sendAt.getTime();

  if (diff > time.FIVE_MINUTES) {
    throw new Error(errors.VERIFY_CODE_EXPIRED);
  }

  return true;
};

class AuthService {
  constructor({ UsersService, oAuthService }) {
    this.usersService = UsersService;
    this.oAuthService = oAuthService;
  }

  async signUp(data) {
    const { password } = data;

    const hashedPassword = await bcrypt.hash(password, saltLength);

    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    return new SignUpResponse(user);
  }

  async signIn({ email, password }) {
    try {
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
    } catch (error) {
      throw new Error(error.message || errors.SIGN_IN_FAILED);
    }
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
      throw new Error(error.message || errors.CONFIRM_EMAIL_FAILED);
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
      throw new Error(error.message || errors.REFRESH_TOKEN_FAILED);
    }
  }

  async getMe(idOAuth) {
    try {
      const user = await this.getUserByIdOauth(idOAuth);

      return new GetMeResponse(user);
    } catch (error) {
      throw new Error(error.message || errors.GET_ME_FAILED);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await this.usersService.getUserByEmail(email);

      const verifyCode = randomVerifiedCode();

      await this.usersService.updateByPk(user.id, {
        verifyCode,
        verifyCodeSendAt: new Date(),
      });

      await sendVerifyCode({ email, verifyCode });

      return {
        message: infors.SEND_VERIFY_CODE_SUCCESS,
      };
    } catch (error) {
      throw new Error(error.message || errors.FORGOT_PASSWORD_FAILED);
    }
  }

  async verifyCode({ email, verifyCode }) {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        throw new Error(errors.USER_NOT_FOUND);
      }

      checkVerifyCode({ user, verifyCode });

      return {
        message: infors.VERIFY_CODE_SUCCESS,
      };
    } catch (error) {
      throw new Error(error.message || errors.VERIFY_CODE_FAILED);
    }
  }

  async resetPassword({ email, password, verifyCode }) {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        throw new Error(errors.USER_NOT_FOUND);
      }

      checkVerifyCode({ user, verifyCode });

      const hashedPassword = await bcrypt.hash(password, saltLength);

      await this.usersService.updateByPk(user.id, {
        password: hashedPassword,
        verifyCode: null,
        verifyCodeSendAt: null,
      });

      await this.logoutByUserId(user.id);

      return {
        message: infors.RESET_PASSWORD_SUCCESS,
      };
    } catch (error) {
      throw new Error(error.message || errors.RESET_PASSWORD_FAILED);
    }
  }

  async changePassword({ idOAuth, oldPassword, newPassword }) {
    try {
      const user = await this.getUserByIdOauth(idOAuth);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        throw new Error(errors.PASSWORD_INCORRECT);
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltLength);

      await this.usersService.updateByPk(user.id, {
        password: hashedPassword,
      });

      await this.logoutByUserId(user.id);

      return {
        message: infors.CHANGE_PASSWORD_SUCCESS,
      };
    } catch (error) {
      throw new Error(error.message || errors.CHANGE_PASSWORD_FAILED);
    }
  }

  async getUserByIdOauth(idOAuth) {
    try {
      const oAuth = await this.oAuthService.getOauthAccessTokenById(idOAuth);

      if (!oAuth) {
        throw new Error(errors.TOKEN_INVALID);
      }

      const user = await this.usersService.getUserById(oAuth.userId);

      return user;
    } catch (error) {
      throw new Error(error.message || errors.GET_USER_BY_ID_OAUTH_FAILED);
    }
  }

  logoutByUserId(userId) {
    return this.oAuthService.deleteOauthAccessTokenByUserId(userId);
  }
}

export default new AuthService({
  UsersService,
  oAuthService: oAuthAccessTokenService,
});
