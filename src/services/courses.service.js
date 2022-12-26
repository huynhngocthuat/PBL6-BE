import { CoursesRepository } from 'repositories';
import { json } from 'utils';
import { getPagination, getPagingData } from 'helpers/pagging';
import { errors, infors } from 'constants';
import { AttendanceOfCourse } from 'commons/responses/auth';
import db from 'models';
import logger from 'configs/winston.config';
import TotalRevenue from 'dtos/totalRevenue';
import TotalCourse from 'dtos/totalCourse';
import BaseService from './base.service';
import SectionsService from './sections.service';
import HashtagsService from './hashtag.service';
import CourseHashtagsService from './courseHashtags.service';
import SubscribesService from './subscribes.service';

class CoursesService extends BaseService {
  constructor(
    repo,
    sectionsService,
    hashtagsService,
    courseHashtagsService,
    subscribesService
  ) {
    super(repo);
    this.sectionsService = sectionsService;
    this.hashtagsService = hashtagsService;
    this.courseHashtagsService = courseHashtagsService;
    this.subscribesService = subscribesService;
  }

  async getCourseById(courseId) {
    try {
      const data = await this.find(courseId);
      const totalPurchaser =
        await this.subscribesService.countSubcribersOfCourse(courseId);
      const jsonData = json(data);

      return { ...jsonData, ...totalPurchaser };
    } catch (error) {
      throw new Error(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async create(data) {
    const t = await db.sequelize.transaction();
    logger.info(infors.START_TRANSACTION_CREATE_COURSE);

    try {
      let hashtag = {};
      let hashtagId;

      const savedCourse = await this.repo.create(data, { transaction: t });

      for (let i = 0; i < data.hashtags.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        hashtag = await this.hashtagsService.findOneByCondition({
          name: {
            $iLike: `${data.hashtags[i]}`,
          },
        });

        if (!hashtag) {
          // create new hashtag if not exist
          // eslint-disable-next-line no-unused-vars, no-await-in-loop
          const savedhashtag = await this.hashtagsService.create(
            {
              name: data.hashtags[i],
            },
            { transaction: t }
          );

          hashtagId = json(savedhashtag).id;
        } else {
          hashtagId = json(hashtag).id;
        }

        const courseHashtag = {
          courseId: json(savedCourse).id,
          hashtagId,
        };

        // Create and save a courseHashtag
        // eslint-disable-next-line no-unused-vars, no-await-in-loop
        await this.courseHashtagsService.create(courseHashtag, {
          transaction: t,
        });
      }

      await t.commit();
      logger.info(infors.COMMIT_TRANSACTION_CREATE_COURSE);

      return savedCourse;
    } catch (error) {
      await t.rollback();
      logger.info(infors.ROLLBACK_TRANSACTION_CREATE_COURSE);

      logger.error(`${errors.ERR_WHILE_CREATE_COURSE_AT_SER} - ${error}`);
      throw new Error(error);
    }
  }

  async findCourseByCondition(condition) {
    try {
      return await this.repo.findOneByCondition(condition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSectionsByCourse(courseId, pagination = null, isDeleted = false) {
    try {
      const resp = {};
      let data;
      const total = await this.sectionsService.countSectionsOfCourse(courseId);

      if (pagination) {
        const { offset, limit } = getPagination(pagination);

        data = await this.repo.findOneByCondition({ id: courseId }, isDeleted, {
          association: 'sections',
          offset,
          limit,
        });

        resp.pagination = getPagingData(
          total,
          Math.ceil(offset / limit) + 1,
          limit
        );
      } else {
        data = await this.repo.findOneByCondition({ id: courseId }, isDeleted, {
          association: 'sections',
        });
      }

      const { sections } = json(data);
      resp.sections = sections;

      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchCourses(isAdmin, condition, pagination) {
    try {
      const data = {};
      const tagFilter = {
        key: `%${condition.key}%`,
        category: condition.category,
        hashtag: condition.hashtag,
        gteq: condition.gteq,
        lteq: condition.lteq,
      };

      if (pagination) {
        const { offset, limit } = getPagination(pagination);
        const courses = await this.repo.searchCourses(isAdmin, {
          ...tagFilter,
          limit,
          offset,
        });

        data.courses = courses;

        const total = await this.repo.countResultFromSearchCourses(
          isAdmin,
          tagFilter
        );
        const pagingData = getPagingData(
          total,
          Math.ceil(offset / limit) + 1, // cal current_page
          limit
        );

        data.pagination = pagingData;
      } else {
        const courses = await this.repo.searchCourses(false, {
          ...tagFilter,
          limit: null,
          offset: null,
        });

        data.courses = courses;
      }

      return data;
    } catch (error) {
      logger.error(`${errors.ERR_WHITE_SEARCH_COURSE_AT_SER} - ${error}`);

      throw new Error(error);
    }
  }

  async getUserAttendanceCourseYear(id, year) {
    try {
      let data = await this.repo.getUserAttendanceCourseYear(id, year);

      data = data.map((item) => ({
        ...item,
        attendance: +item.attendance,
      }));

      return new AttendanceOfCourse({ year, data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async countAllCourse() {
    try {
      const data = await this.repo.countAllCourse();
      const totalCourse = {};

      // if data is null assign 0
      if (!data) {
        totalCourse.total = 0;
      } else {
        totalCourse.total = data;
      }

      return new TotalCourse(totalCourse);
    } catch (error) {
      throw new Error(error);
    }
  }

  async sumAllRevenueOfAllSoldCourse() {
    try {
      const data = await this.repo.sumAllRevenueOfAllSoldCourse();
      const totalRevenue = {};

      // if data is null assign 0
      if (!data) {
        totalRevenue.total = 0;
      } else {
        totalRevenue.total = +data[0].sum;
      }

      return new TotalRevenue(totalRevenue);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Count all courses not deleted yet of instructor
   * @param {string} userId is id of course, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {number} is number represents the total record courses of instructor
   */
  async countCoursesOfInstructor(userId) {
    try {
      return this.repo.countCoursesOfInstructor(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkUserFinishCourse(userId, courseId) {
    try {
      return this.repo.checkUserFinishCourse(userId, courseId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CoursesService(
  CoursesRepository,
  SectionsService,
  HashtagsService,
  CourseHashtagsService,
  SubscribesService
);
