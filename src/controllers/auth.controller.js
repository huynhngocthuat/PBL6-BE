import { AuthService } from "services";
import Response from "helpers/response";

class AuthController {
  constructor(service) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.service = service;
  }

  async register(req, res) {
    try {
      const user = await this.service.signUp(req.user);
      return Response.success(res, { docs: user }, 201);
    } catch (error) {
      return Response.error(res, error);
    }
  }

  async login(req, res) {
    try {
      const data = await this.service.signIn(req.login);
      return Response.success(res, { docs: data });
    } catch (error) {
      return Response.error(res, error);
    }
  }
}

export default new AuthController(AuthService);
