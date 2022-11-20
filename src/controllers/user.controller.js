import { UsersService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors } from 'constants';

class UsersController {
  constructor(service) {
    this.service = service;
    this.getCourses = this.getCourses.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  async getCourses(req, res) {
    try {
      // id of instructor
      const { id } = req.params;
      const data = await this.service.findCourseByInstructor(id);
      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_GET.format('courses of instructor'),
        400
      );
    }
  }

  async uploadAvatar(req, res) {
    try {
      const { idOAuth } = req.jwt;
      const { avatarUrl } = req.body;
      const data = await this.service.updateAvatar(idOAuth, avatarUrl);
      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      const message = error || errors.WHILE_UPDATE.format('avatar');
      return Response.error(res, message, 400);
    }
  }

  async updateProfile(req, res) {
    try {
      const { user } = req;
      const profile = req.body;
      const docs = await this.service.updateProfile(user.id, profile);
      return Response.success(res, { docs }, httpCodes.STATUS_OK);
    } catch (error) {
      const message = error || errors.WHILE_UPDATE.format('profile');
      return Response.error(res, message, 400);
    }
  }

  async getUserDetails(req, res) {
    const { user } = req;
    try {
      const docs = await this.service.getUserDetailsByUserId(user.id, user);

      return Response.success(res, { docs }, httpCodes.STATUS_OK);
    } catch (error) {
      const message = error || errors.WHILE_GET.format('user detail');
      return Response.error(res, message, 400);
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const docs = await this.service.getUserById(id);
      return Response.success(res, { docs }, httpCodes.STATUS_OK);
    } catch (error) {
      const message = error || errors.WHILE_GET.format('user by id');
      return Response.error(res, message, 400);
    }
  }
}

export default new UsersController(UsersService);
