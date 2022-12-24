import StatisticOverview from 'dtos/statisticOverview';
import { usersRepository } from 'repositories';
import BaseService from './base.service';
import SubscribesService from './subscribes.service';
import CoursesService from './courses.service';
import UsersService from './users.service';

class AdminService extends BaseService {
  constructor(repo, { SubscribesService, CoursesService, UsersService }) {
    super(repo);
    this.subscribesService = SubscribesService;
    this.coursesService = CoursesService;
    this.usersService = UsersService;
  }

  async statisticOverview() {
    try {
      const totalPurchaser = await this.subscribesService.countAllSubcriber();
      const totalCourse = await this.coursesService.countAllCourse();
      const totalUser = await this.usersService.countAllUser();
      const totalRevenue =
        await this.coursesService.sumAllRevenueOfAllSoldCourse();

      return new StatisticOverview({
        ...totalPurchaser,
        ...totalCourse,
        ...totalUser,
        ...totalRevenue,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllSoldCourses(pagination) {
    try {
      return await this.subscribesService.getAllSoldCourses(pagination);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new AdminService(usersRepository, {
  SubscribesService,
  CoursesService,
  UsersService,
});
