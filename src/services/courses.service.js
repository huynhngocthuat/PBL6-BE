import { CoursesRepository } from 'repositories';

class CoursesService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(data) {
    try {
      return await this.repo.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(CoursesRepository);
