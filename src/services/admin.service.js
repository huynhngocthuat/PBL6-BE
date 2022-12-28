import StatisticOverview from 'dtos/statisticOverview';
import { usersRepository } from 'repositories';
import { json } from 'utils';
import { UserResponse } from 'commons/responses/auth';
import { status } from 'constants';
import BaseService from './base.service';
import SubscribesService from './subscribes.service';
import CoursesService from './courses.service';
import UsersService from './users.service';
import UserStatussService from './userStatuss.service';

class AdminService extends BaseService {
  constructor(
    repo,
    { SubscribesService, CoursesService, UsersService, UserStatussService }
  ) {
    super(repo);
    this.subscribesService = SubscribesService;
    this.coursesService = CoursesService;
    this.usersService = UsersService;
    this.userStatussService = UserStatussService;
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

  async activatedUser(idUser, isActivated) {
    try {
      const data = await this.usersService.updateByCondition(
        {
          id: idUser,
        },
        {
          isActivated,
        }
      );

      return new UserResponse(json(data[1][0]));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserDetail(userId) {
    try {
      const data = await this.usersService.getInforDetailOfUserByUserId(userId);
      const userRequest = await this.userStatussService.findUserRequestByStatus(
        userId,
        status.WAITING_STATUS
      );

      data.userRequest = userRequest;

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new AdminService(usersRepository, {
  SubscribesService,
  CoursesService,
  UsersService,
  UserStatussService,
});
