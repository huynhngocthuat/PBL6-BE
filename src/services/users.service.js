import { usersRepository } from 'repositories';
import { v4 as uuidv4 } from 'uuid';
import { sendEmailConfirm } from 'helpers/mail';
import { json } from 'utils';
import { errors } from 'constants';

class UsersService {
  constructor(repo) {
    this.repo = repo;
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

  async create(data) {
    try {
      const user = await this.repo.create(data);
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

  async findCourseByInstructor(userId, isDeleted = false) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: userId },
        isDeleted,
        { association: 'courses', limit: 2 }
      );

      const { courses } = json(data);

      return courses;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UsersService(usersRepository);
