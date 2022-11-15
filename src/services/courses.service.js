import { CoursesRepository } from 'repositories';
import { json } from 'utils';
import { getPagination, getPagingData } from 'helpers/pagging';
import { errors, infors } from 'constants';
import db from 'models';
import logger from 'configs/winston.config';
import BaseService from './base.service';
import SectionsService from './sections.service';
import HashtagsService from './hashtag.service';
import CourseHashtagsService from './courseHashtags.service';

class CoursesService extends BaseService {
  constructor(repo, sectionsService, hashtagsService, courseHashtagsService) {
    super(repo);
    this.sectionsService = sectionsService;
    this.hashtagsService = hashtagsService;
    this.courseHashtagsService = courseHashtagsService;
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
}

export default new CoursesService(
  CoursesRepository,
  SectionsService,
  HashtagsService,
  CourseHashtagsService
);
