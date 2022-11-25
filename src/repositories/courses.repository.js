import db from 'models';
import { QueryTypes } from 'sequelize';
import logger from 'configs/winston.config';
import { errors } from 'constants';
import BaseRepository from 'commons/base.repository';

const { Course } = db;

export class CoursesRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(model) {
    super(model);
  }

  // eslint-disable-next-line class-methods-use-this
  async searchCourses(condition) {
    try {
      const courses = await db.sequelize.query(
        ` SELECT
              DISTINCT ON (id) Courses."id",  
              Courses."name",
              Courses."price",
              Courses."thumbnailUrl",
              Courses."description",
              Courses."isActived",
              Courses."userId",
              Courses."categoryTopicId",
              Courses."createdAt",
              Courses."updatedAt",
              Courses."deletedAt"
          FROM public."Courses" AS Courses 
              LEFT JOIN public."CategoryTopics" AS CategoryTopics ON 
                                                                  CategoryTopics."id" = Courses."categoryTopicId"
              LEFT JOIN public."CourseHashtags" AS CourseHashtags ON
                                                                  CourseHashtags."courseId" = Courses."id"
              LEFT JOIN public."Hashtags" AS Hashtags ON
                                                      Hashtags.id = CourseHashtags."hashtagId"
          WHERE 
              Courses."name" ILIKE $name OR 
              COALESCE(Courses."description", '') ILIKE $description OR
              CategoryTopics."name" ILIKE $categoryName OR
              COALESCE(Hashtags."name", '') ILIKE $hashtagName
          ORDER BY
              Courses."id"
          LIMIT $limit OFFSET $offset`,
        {
          logging: console.log,
          bind: { ...condition },
          type: QueryTypes.SELECT,
        }
      );

      return courses;
    } catch (error) {
      logger.error(`${errors.ERR_WHITE_SEARCH_COURSE_AT_REPO} - ${error}`);

      throw new Error(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async countResultFromSearchCourses(condition) {
    try {
      const count = await db.sequelize.query(
        ` SELECT
              COUNT (DISTINCT Courses."id")  
          FROM public."Courses" AS Courses 
              LEFT JOIN public."CategoryTopics" AS CategoryTopics ON 
                                                                  CategoryTopics."id" = Courses."categoryTopicId"
              LEFT JOIN public."CourseHashtags" AS CourseHashtags ON
                                                                  CourseHashtags."courseId" = Courses."id"
              LEFT JOIN public."Hashtags" AS Hashtags ON
                                                      Hashtags.id = CourseHashtags."hashtagId"
          WHERE 
              Courses."name" ILIKE $name OR 
              COALESCE(Courses."description", '') ILIKE $description OR
              CategoryTopics."name" ILIKE $categoryName OR
              COALESCE(Hashtags."name", '') ILIKE $hashtagName`,
        {
          logging: console.log,
          bind: { ...condition },
          type: QueryTypes.SELECT,
        }
      );

      return Number(count[0].count);
    } catch (error) {
      logger.error(`${errors.ERR_WHITE_COUNT_COURSE_AT_REPO} - ${error}`);

      throw new Error(error);
    }
  }
}

export default new CoursesRepository(Course);
