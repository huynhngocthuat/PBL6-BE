import { AuthService } from 'services';
import Response from 'helpers/response';
import redisClient from 'configs/redis.config';
import { setKey } from 'helpers/redis';

class AuthController {
  constructor(service) {
    this.service = service;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getMe = this.getMe.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.adminLogin = this.adminLogin.bind(this);
  }

  async register(req, res) {
    try {
      const user = await this.service.signUp(req.body);
      return Response.success(res, { docs: user }, 201);
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async login(req, res) {
    try {
      const docs = await this.service.signIn(req.body);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async logout(req, res) {
    try {
      const { idOAuth, exp } = req.jwt;
      const tokenRevokeKey = `revoke_${req.token}`;
      // await redisClient.set(tokenRevokeKey, req.token);
      await setKey(0, tokenRevokeKey, req.token);
      await redisClient.expireAt(tokenRevokeKey, exp);

      const docs = await this.service.logout(idOAuth);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async confirmEmail(req, res) {
    try {
      const docs = await this.service.confirmEmail(req.params.confirmToken);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async refreshToken(req, res) {
    try {
      const docs = await this.service.refreshToken(req.body.refreshToken);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async getMe(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const docs = await this.service.getMe(idOAuth);

      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const docs = await this.service.forgotPassword(email);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, verifyCode } = req.body;
      const docs = await this.service.verifyCode({ email, verifyCode });
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, verifyCode, password } = req.body;
      const docs = await this.service.resetPassword({
        email,
        verifyCode,
        password,
      });
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async changePassword(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const { oldPassword, newPassword } = req.body;
      const docs = await this.service.changePassword({
        idOAuth,
        oldPassword,
        newPassword,
      });
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async adminLogin(req, res) {
    try {
      const isAdmin = true;
      const docs = await this.service.signIn(req.body, isAdmin);
      return Response.success(res, { docs });
    } catch (error) {
      return Response.error(res, error);
    }
  }
}

export default new AuthController(AuthService);
