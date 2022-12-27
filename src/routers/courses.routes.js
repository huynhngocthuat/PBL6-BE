import { roles } from 'constants';
import { CoursesController } from 'controllers';
import express from 'express';
import AuthMiddleware from 'middlewares/auth';
import { ValidatorBody, ValidatorId, ValidatorPublicCourse } from 'validations';

const router = express.Router();
router.get('/:id/analysis', CoursesController.analysisCourseOfInstructor);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The courses managing API
 */

// annonymouse
/**
 * @swagger
 * /courses:
 *    get:
 *      summary: Search courses of system
 *      security:
 *       - BearerAuth: []
 *      tags: [Courses]
 *      parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        required: false
 *        example: 1
 *        description: The number of page to query for course
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 10
 *        required: false
 *        example: 10
 *        description: The numbers of items to return
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *        required: false
 *        example: Front End
 *        description: Category of course
 *      - in: query
 *        name: hashtag
 *        schema:
 *          type: string
 *        required: false
 *        example: Front End
 *        description: Category of course
 *      responses:
 *        200:
 *          description: Status success and information about category
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/CategoryTopic'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while get list category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/search', CoursesController.search);
router.get('/', CoursesController.get);
router.get('/:id', ValidatorId, CoursesController.get);
router.get('/:id/sections', ValidatorId, CoursesController.getSections);

// Authen
router.use(AuthMiddleware.isRequired);

// instructor
router.get(
  '/:id/public',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  ValidatorPublicCourse,
  CoursesController.publicCourse
);

// user instructor
router.post(
  '/check-finish-course',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE, roles.USER_ROLE),
  ValidatorBody('checkFinishCourse'),
  CoursesController.checkUserFinishCourse
);

// instructor of course
router.put(
  '/:id',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

// instructor of course
router.delete(
  '/:id',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  CoursesController.delete
);

export default router;
