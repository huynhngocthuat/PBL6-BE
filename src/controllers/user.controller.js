import { UsersService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages, roles } from 'constants';

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
    this.getRequestsOfUser = this.getRequestsOfUser.bind(this);
    this.requestBecomeToInstructor = this.requestBecomeToInstructor.bind(this);
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
      const { page, limit } = req.query;
      let { key, role } = req.query;

      const pagination = {
        // eslint-disable-next-line radix
        page: parseInt(page || pages.PAGE_DEFAULT),
        // eslint-disable-next-line radix
        limit: parseInt(limit || pages.LIMIT_DEFAULT),
      };

      key = key || '';
      role = role || '';
      role =
        role.toUpperCase() === roles.INSTRUCTOR_ROLE ||
        role.toUpperCase() === roles.USER_ROLE
          ? [role.toUpperCase()]
          : [roles.INSTRUCTOR_ROLE, roles.USER_ROLE];

      const condition = {
        keyword: key,
        roles: role,
      };

      const data = await this.service.getUsers(condition, pagination);

      return Response.success(
        res,
        { docs: data.users, pagination: data.pagination },
        httpCodes.STATUS_OK
      );
      // eslint-disable-next-line no-else-return
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

  async getRequestsOfUser(req, res) {
    try {
      const { page, limit } = req.query;

      if (page || limit) {
        const data = await this.service.getRequestsOfUser({
          // eslint-disable-next-line radix
          page: parseInt(page || pages.PAGE_DEFAULT),
          // eslint-disable-next-line radix
          limit: parseInt(limit || pages.LIMIT_DEFAULT),
        });

        return Response.success(
          res,
          { docs: data.userRequests, pagination: data.pagination },
          httpCodes.STATUS_OK
        );
        // eslint-disable-next-line no-else-return
      } else {
        const data = await this.service.getRequestsOfUser();
        return Response.success(
          res,
          { docs: data.userRequests },
          httpCodes.STATUS_OK
        );
      }
    } catch (error) {
      return Response.error(
        res,
        errors.WHILE_GET.format('get user requests'),
        httpCodes.STATUS_BAD_REQUEST
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  requestBecomeToInstructor(req, res) {
    try {
      return Response.success(res, { docs: {} }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        errors.ERR_WHILE_REQUEST_BECOME_INSTRUCTOR,
        httpCodes.STATUS_BAD_REQUEST
      );
    }
  }
}

export default new UsersController(UsersService);
