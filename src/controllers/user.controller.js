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
    this.updateViewOfUserForVideo = this.updateViewOfUserForVideo.bind(this);
    this.getUserRoleIsUserOrInstructor =
      this.getUserRoleIsUserOrInstructor.bind(this);
    this.getVideoViewOfUser = this.getVideoViewOfUser.bind(this);
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

  async updateViewOfUserForVideo(req, res) {
    try {
      const data = await this.service.updateViewOfUserForVideo(req.body);

      return Response.success(
        res,
        { docs: data.videoViewSaved },
        data.type === 'create' ? httpCodes.STATUS_CREATED : httpCodes.STATUS_OK
      );
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_UPDATE_VIEW,
        httpCodes.STATUS_BAD_REQUEST
      );
    }
  }

  async getUserRoleIsUserOrInstructor(req, res) {
    try {
      const users = await this.service.getUsers(req.body);

      return Response.success(res, { docs: users }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_GET.format('get users'),
        httpCodes.STATUS_BAD_REQUEST
      );
    }
  }

  async getVideoViewOfUser(req, res) {
    try {
      const { id, idVideo } = req.params;

      const data = await this.service.getVideoViewOfUser(idVideo, id);

      return Response.success(res, { docs: { data } }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_GET.format('video view'),
        httpCodes.STATUS_BAD_REQUEST
      );
    }
  }
}

export default new UsersController(UsersService);
