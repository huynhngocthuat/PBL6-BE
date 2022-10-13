import { usersRepository } from "repositories";

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
      return await this.repo.create(data);
    } catch (error) {
      throw new Error("User not created");
    }
  }
}

export default new UsersService(usersRepository);
