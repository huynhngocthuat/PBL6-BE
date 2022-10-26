import { usersRepository } from 'repositories';
import { v4 as uuidv4 } from 'uuid';
import sendMail from 'helpers/mail';
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
      const html = `
        <h1>Confirm your email</h1>
        <p>Please click on the link below to confirm your email</p>
        <a href="${process.env.BASE_URL}/confirmEmail/${confirmToken}">Confirm email</a>
      `;
      sendMail(user.email, 'Confirm email', html);

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
      throw new Error(errors.USER_NOT_CONFIRMED);
    }
  }
}

export default new UsersService(usersRepository);
