import { SignUpResponse, SignInResponse } from 'commons/responses/auth';

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
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
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
      refreshToken: oAuth.refreshToken,
    });

    return new SignInResponse({
      token,
      refreshToken,
    });
  }

  async logout(idOAuth) {
    await this.oAuthService.deleteOauthAccessToken(idOAuth);
    return infors.LOGOUT_SUCCESS;
  }

  async confirmEmail(confirmToken) {
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
  }

  async refreshToken(jwtRefreshToken) {
    const decoded = jwt.refreshVerify(jwtRefreshToken);

    if (!decoded) {
      throw new Error(errors.TOKEN_INVALID);
    }

    const { refreshToken } = decoded;

    const oAuth = await this.oAuthService.getOauthAccessTokenByRefreshToken(
      refreshToken
    );

    if (!oAuth) {
      throw new Error(errors.TOKEN_INVALID);
    }

    const token = jwt.sign({
      idOAuth: oAuth.id,
    });

    return new SignInResponse({
      token,
      refreshToken: jwtRefreshToken,
    });
  }
}

export default new AuthService();
