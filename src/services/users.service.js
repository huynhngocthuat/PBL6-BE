import { usersRepository } from "repositories";
import { v4 as uuidv4 } from "uuid";
import sendMail from "helpers/mail";

class UsersService {
  constructor(repo) {
    this.repo = repo;
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.create = this.create.bind(this);
  }

  async getUserByEmail(email) {
    try {
      const user = await this.repo.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }

  async create(data) {
    try {
      const user = await this.repo.create(data);
      const confirmToken = uuidv4();
      const userWithConfirmToken = await this.repo.update(user.id, {
        confirmToken,
      });
      const html = `
        <h1>Confirm your email</h1>
        <p>Please click on the link below to confirm your email</p>
        <a href="${process.env.BASE_URL}/confirm/${confirmToken}">Confirm email</a>
      `;
      sendMail(user.email, "Confirm email", html);
      return userWithConfirmToken;
    } catch (error) {
      throw new Error("User not created");
    }
  }

  async confirmEmail(confirmToken) {
    try {
      const user = await this.repo.getUserByConfirmToken(confirmToken);

      if (!user) {
        throw new Error("User not found");
      }

      await this.repo.update(user.id, {
        isActivated: true,
        confirmedAt: new Date(),
        confirmToken: null,
      });
    } catch (error) {
      throw new Error("User not confirmed");
    }
  }
}

export default new UsersService(usersRepository);
