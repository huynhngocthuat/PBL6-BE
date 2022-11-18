import { usersRepository } from 'repositories';
import { v4 as uuidv4 } from 'uuid';
import { sendEmailConfirm } from 'helpers/mail';
import { json } from 'utils';
import { errors, infors } from 'constants';
import { UserDetailsResponse } from 'commons/responses/auth';
import oAuthAccessTokenService from './oAuthAccessToken.service';
import UserDetailsService from './userDetails.service';

class UsersService {
  constructor(repo, { oAuthService, UserDetailsService }) {
    this.repo = repo;
    this.oAuthService = oAuthService;
    this.UserDetailsService = UserDetailsService;
  }

  async getUserById(id) {
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
   * @param {boolean} isDeleted is optional param to get with video was deleted or not, default value: false
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
}

export default new UsersService(usersRepository, {
  oAuthService: oAuthAccessTokenService,
  UserDetailsService,
});
