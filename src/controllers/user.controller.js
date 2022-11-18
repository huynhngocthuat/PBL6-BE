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
      return Response.error(res, errors.WHILE_UPDATE.format('avatar'), 400);
    }
  }

  async updateProfile(req, res) {
    try {
      const { user } = req;
      const profile = req.body;
      const docs = await this.service.updateProfile(user.id, profile);
      return Response.success(res, { docs }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.WHILE_UPDATE.format('profile'), 400);
    }
  }

  async getUserDetails(req, res) {
    const { user } = req;

    try {
      const userDetails = await this.service.getUserDetailsByUserId(
        user.id,
        user
      );

      const docs = {
        ...userDetails,
      };

      return Response.success(res, { docs }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(res, errors.WHILE_GET.format('user details'), 400);
    }
  }
}

export default new UsersController(UsersService);
