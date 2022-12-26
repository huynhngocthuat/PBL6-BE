/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
import { CoursesService } from 'services';
import Response from 'helpers/response';
import { httpCodes, errors, pages, infors, roles } from 'constants';
import logger from 'configs/winston.config';

class CoursesController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.getSections = this.getSections.bind(this);
    this.search = this.search.bind(this);
    this.analysisCourseOfInstructor =
      this.analysisCourseOfInstructor.bind(this);
    this.getCoursesForAdmin = this.getCoursesForAdmin.bind(this);
    this.checkUserFinishCourse = this.checkUserFinishCourse.bind(this);
  }

  async create(req, res) {
    try {
      const data = await this.service.create(req.body);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error(`${errors.WHILE_CREATE.format('course')} - ${error}`);
      return Response.error(res, errors.WHILE_CREATE.format('course'), 400);
    }
  }

  async getCoursesForAdmin(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;

      if (id) {
        const data = await this.service.getCourseById(id);
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      } else {
        const isAdmin = req.user.role === roles.ADMIN_ROLE;
        const condition = {
          key: req.query.key || '',
          category: req.query.category ?? [],
          hashtag: req.query.tag ?? [],
          gteq: req.query.gteq ?? Number.MAX_SAFE_INTEGER,
          lteq: req.query.lteq ?? 0,
        };

        const data = await this.service.searchCourses(isAdmin, condition, {
          page: parseInt(page || pages.PAGE_DEFAULT),
          limit: parseInt(limit || pages.LIMIT_DEFAULT),
        });

        return Response.success(
          res,
          { docs: data.courses, pagination: data.pagination },
          httpCodes.STATUS_OK
        );
      }
    } catch (error) {
      console.log(error);
      return Response.error(
        res,
        { message: errors.WHILE_GET.format('course') },
        400
      );
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;

      if (id) {
        const data = await this.service.getCourseById(id);
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      } else {
        const condition = {
          key: req.query.key || '',
          category: req.query.category ?? [],
          hashtag: req.query.tag ?? [],
          gteq: req.query.gteq ?? Number.MAX_SAFE_INTEGER,
          lteq: req.query.lteq ?? 0,
        };

        const data = await this.service.searchCourses(false, condition, {
          page: parseInt(page || pages.PAGE_DEFAULT),
          limit: parseInt(limit || pages.LIMIT_DEFAULT),
        });

        return Response.success(
          res,
          { docs: data.courses, pagination: data.pagination },
          httpCodes.STATUS_OK
        );
      }
    } catch (error) {
      console.log(error);
      return Response.error(
        res,
        { message: errors.WHILE_GET.format('course') },
        400
      );
    }
  }

  async getSections(req, res) {
    try {
      // id of course
      const { id } = req.params;
      const { page, limit } = req.query;

      if (page || limit) {
        const data = await this.service.findSectionsByCourse(id, {
          page: parseInt(page || pages.PAGE_DEFAULT),
          limit: parseInt(limit || pages.LIMIT_DEFAULT),
        });

        return Response.success(
          res,
          { docs: data.sections, pagination: data.pagination },
          httpCodes.STATUS_OK
        );
      }

      const data = await this.service.findSectionsByCourse(id);
      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        { message: errors.WHILE_GET.format('sections of course') },
        400
      );
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);

      if (data) {
        return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
      }
      return Response.error(
        res,
        { message: errors.WHILE_UPDATE.format('course') },
        400
      );
    } catch (error) {
      return Response.error(
        res,
        { message: errors.WHILE_UPDATE.format('course') },
        400
      );
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      return Response.error(
        res,
        { message: errors.WHILE_DELETE.format('course') },
        400
      );
    }
  }

  // eslint-disable-next-line consistent-return
  async search(req, res) {
    try {
      const { page, limit } = req.query;

      const condition = {
        key: req.query.key || '',
        category: req.query.category ?? [],
        hashtag: req.query.tag ?? [],
        gteq: req.query.gteq ?? Number.MAX_SAFE_INTEGER,
        lteq: req.query.lteq ?? 0,
      };

      console.log(condition);
      let courses;

      if (page || limit) {
        courses = await this.service.searchCourses(false, condition, {
          page: parseInt(page || pages.PAGE_DEFAULT),
          limit: parseInt(limit || pages.LIMIT_DEFAULT),
        });
      } else {
        courses = await this.service.searchCourses(false, condition, null);
      }

      logger.info(
        `${infors.REQUEST_AT_CONTROLLER.format(
          'search courses',
          JSON.stringify(req.body),
          JSON.stringify(req.query),
          JSON.stringify(req.params)
        )}`
      );
      return Response.success(res, { docs: courses }, httpCodes.STATUS_OK);
    } catch (error) {
      logger.error(
        `${errors.REQUEST_AT_CONTROLLER.format(
          'search courses',
          JSON.stringify(req.body),
          JSON.stringify(req.query),
          JSON.stringify(req.params)
        )} - ${error}`
      );

      return Response.error(
        res,
        { message: errors.WHILE_SEARCH.format('course') },
        400
      );
    }
  }

  async analysisCourseOfInstructor(req, res) {
    try {
      const { year } = req.query;
      const { id } = req.params;

      console.log(id, year);
      const data = await this.service.getUserAttendanceCourseYear(id, year);

      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      console.log(error);
      return Response.error(
        res,
        { message: errors.WHILE_GET.format('analysis course') },
        400
      );
    }
  }

  async checkUserFinishCourse(req, res) {
    try {
      const { userId, courseId } = req.body;
      console.log(req.body);
      const data = await this.service.checkUserFinishCourse(userId, courseId);
      return Response.success(res, { docs: data }, httpCodes.STATUS_OK);
    } catch (error) {
      console.log(error);
      return Response.error(
        res,
        { message: errors.ERR_WHILE_CHECK_USER_FINISH_COURSE },
        400
      );
    }
  }
}

export default new CoursesController(CoursesService);
