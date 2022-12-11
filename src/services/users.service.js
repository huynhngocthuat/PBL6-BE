import { usersRepository } from 'repositories';
import { v4 as uuidv4 } from 'uuid';
import { sendEmailConfirm } from 'helpers/mail';
import { json } from 'utils';
import { errors, infors, roles } from 'constants';
import { UserDetailsResponse, GetMeResponse } from 'commons/responses/auth';
import oAuthAccessTokenService from './oAuthAccessToken.service';
import UserDetailsService from './userDetails.service';
import videoViewsService from './videoViews.service';
import userStatussService from './userStatuss.service';

class UsersService {
  constructor(
    repo,
    { oAuthService, UserDetailsService, videoViewsService, userStatussService }
  ) {
    this.repo = repo;
    this.oAuthService = oAuthService;
    this.UserDetailsService = UserDetailsService;
    this.videoViewsService = videoViewsService;
    this.userStatussService = userStatussService;
  }

  /**
   * Get list user have role user or instructor of system
   * @returns {array} list object user of system
   */
  async getUsers() {
    const condition = {
      role: {
        $or: [roles.INSTRUCTOR_ROLE, roles.USER_ROLE],
      },
    };

    try {
      const users = await this.repo.findAllByCondition(condition);

      return json(users);
    } catch (error) {
      throw new Error(errors.USER_NOT_FOUND);
    }
  }

  async getUser(id) {
    try {
      const user = await this.repo.find(id);
      return json(user);
    } catch (error) {
      throw new Error(errors.USER_NOT_FOUND);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.repo.getUserByEmail(email);
      return json(user);
    } catch (error) {
      throw new Error(errors.USER_NOT_FOUND);
    }
  }

  async getUserDetailsByUserId(userId, user = {}) {
    try {
      const userDetails = await this.UserDetailsService.getUserDetailsByUserId(
        userId
      );

      const dob = new Date(userDetails.dateOfBirth);
      const data = { ...json(userDetails), ...user, dateOfBirth: dob };

      return new UserDetailsResponse(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    // get user by id (res same as getMe)
    try {
      const user = await this.repo.find(id);
      return new GetMeResponse(user);
    } catch (error) {
      throw new Error(errors.USER_NOT_FOUND);
    }
  }

  async create(data) {
    try {
      const user = await this.repo.create(data);
      await this.UserDetailsService.create({
        userId: user.id,
      });

      const confirmToken = uuidv4();
      const userWithConfirmToken = await this.repo.updateByPk(user.id, {
        confirmToken,
      });

      sendEmailConfirm({ email: user.email, confirmToken });

      return json(userWithConfirmToken);
    } catch (error) {
      throw new Error(errors.USER_NOT_CREATED);
    }
  }

  async confirmEmail(confirmToken) {
    try {
      const user = await this.repo.getUserByConfirmToken(confirmToken);

      const userUpdate = await this.repo.updateByPk(user.id, {
        isActivated: true,
        confirmedAt: new Date(),
        confirmToken: null,
      });

      return json(userUpdate);
    } catch (error) {
      throw new Error(errors.USER_CONFIRMED_FAILED);
    }
  }

  /**
   * Get list course of instructor
   * @param {uuid} userId is id of instructor, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @param {bool} isDeleted is optional param to get with video was deleted or not, default value: false
   * @returns {array} list object course of instructor
   */
  async findCourseByInstructor(userId, isDeleted = false) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: userId },
        isDeleted,
        { association: 'courses' }
      );

      const { courses } = json(data);

      return courses;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAvatar(idOAuth, avatarUrl) {
    try {
      const oAuth = await this.oAuthService.getOauthAccessTokenById(idOAuth);
      await this.repo.updateByPk(oAuth.userId, {
        avatarUrl,
      });

      return {
        message: infors.UPDATE_AVATAR_SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateByPk(id, data) {
    try {
      const user = await this.repo.updateByPk(id, data);
      return json(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProfile(userId, profile) {
    const { fullName, ...details } = profile;

    if (fullName) {
      this.updateByPk(userId, { fullName });
    }

    try {
      await this.UserDetailsService.updateByCondition(
        {
          userId,
        },
        {
          ...details,
        }
      );

      return {
        message: infors.UPDATE_PROFILE_SUCCESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateViewOfUserForVideo(videoView) {
    try {
      const data = await this.videoViewsService.updateViewOfVideo(videoView);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getVideoViewOfUser(videoId, userId) {
    try {
      const videoView = await this.videoViewsService.getVideoView(
        videoId,
        userId
      );

      return videoView;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get usee with condition
   * @param {object} condition is condition to find user, e.g, {id: userId,}
   * @returns {object} data about model category is returned from repository
   */
  async findUserByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRequestOfUser() {
    try {
      return await this.userStatussService.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UsersService(usersRepository, {
  oAuthService: oAuthAccessTokenService,
  UserDetailsService,
  videoViewsService,
  userStatussService,
});
