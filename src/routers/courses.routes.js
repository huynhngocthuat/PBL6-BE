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
 * /courses/search:
 *    get:
 *      summary: Search courses of system
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
 *        description: Category of course
 *      - in: query
 *        name: hashtag
 *        schema:
 *          type: string
 *        required: false
 *        description: Hashtag of course
 *      - in: query
 *        name: gteq
 *        schema:
 *          type: integer
 *          min: 0
 *          max: 999999999
 *        required: false
 *        description: Greater than or equal of price course
 *      - in: query
 *        name: lteq
 *        schema:
 *          type: integer
 *          min: 0
 *          max: 999999999
 *        required: false
 *        description: Less than or equal of price course
 *      responses:
 *        200:
 *          description: Status success and data of course
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
 *                      $ref: '#/components/schemas/CourseResponse'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while search course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/search', CoursesController.search);

/**
 * @swagger
 * /courses:
 *    get:
 *      summary: Get courses of system
 *      tags: [Courses]
 *      parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        required: false
 *        description: The number of page to query for course
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 10
 *        required: false
 *        description: The numbers of items to return
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *        required: false
 *        description: Category of course
 *      - in: query
 *        name: hashtag
 *        schema:
 *          type: string
 *        required: false
 *        description: Hashtag of course
 *      - in: query
 *        name: gteq
 *        schema:
 *          type: integer
 *          min: 0
 *          max: 999999999
 *        required: false
 *        description: Greater than or equal of price course
 *      - in: query
 *        name: lteq
 *        schema:
 *          type: integer
 *          min: 0
 *          max: 999999999
 *        required: false
 *        description: Less than or equal of price course
 *      responses:
 *        200:
 *          description: Status success and data of course
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
 *                      $ref: '#/components/schemas/CourseResponse'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while get courses
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/', CoursesController.get);

/**
 * @swagger
 * /courses/{id}:
 *    get:
 *      summary: Get courses of system
 *      tags: [Courses]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of course
 *      responses:
 *        200:
 *          description: Status success and data of course
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                      $ref: '#/components/schemas/CourseResponse'
 *        400:
 *          description: Something wrong while get course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/:id', ValidatorId, CoursesController.get);

/**
 * @swagger
 * /courses/{id}/sections:
 *    get:
 *      summary: Get sections of course
 *      tags: [Courses]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of course
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        required: false
 *        example: 1
 *        description: The number of page to query for section
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 10
 *        required: false
 *        example: 10
 *        description: The numbers of items to return
 *      responses:
 *        200:
 *          description: Status success and data sections of course
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
 *                      $ref: '#/components/schemas/SectionResponse'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while get course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/:id/sections', ValidatorId, CoursesController.getSections);

// Authen
router.use(AuthMiddleware.isRequired);

// instructor
/**
 * @swagger
 * /courses/{id}/public:
 *    get:
 *      summary: Public course
 *      security:
 *       - BearerAuth: []
 *      tags: [Courses]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of course will be public
 *      responses:
 *        200:
 *          description: Status success and data of course
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                      $ref: '#/components/schemas/CourseResponse'
 *        400:
 *          description: Something wrong while get course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get(
  '/:id/public',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  ValidatorPublicCourse(),
  CoursesController.publicCourse
);

// user instructor
/**
 * @swagger
 * /courses/check-finish-course:
 *    post:
 *      summary: Check finish course
 *      security:
 *       - BearerAuth: []
 *      description: Check user finish course
 *      tags: [Courses]
 *      requestBody:
 *        description: A JSON object containing information of user and course
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userId
 *                - courseId
 *          properties:
 *            userId:
 *              type: string
 *              format: uuid
 *              description: The id of user.
 *            courseId:
 *              type: string
 *              format: uuid
 *              description: The id of course.
 *
 *      responses:
 *        200:
 *          description: Status success and variable boolean check_done will be return
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: object
 *                    properties:
 *                      check_done:
 *                        type: boolean
 *
 *        400:
 *          description: Something wrong while check finish course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post(
  '/check-finish-course',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE, roles.USER_ROLE),
  ValidatorBody('checkFinishCourse'),
  CoursesController.checkUserFinishCourse
);

// instructor of course
/**
 * @swagger
 * /courses:
 *    post:
 *      summary: Create course
 *      description: Create a new course
 *      security:
 *       - BearerAuth: []
 *      tags: [Courses]
 *      requestBody:
 *        description: A JSON object containing information of course
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CourseRequest'
 *
 *      responses:
 *        200:
 *          description: Status success and information of the created course will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/CourseResponse'
 *        400:
 *          description: Something wrong while create course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post('/', ValidatorBody('course'), CoursesController.create);

// instructor of course
/**
 * @swagger
 * /courses/{id}:
 *    put:
 *      summary: Update course
 *      description: Update a course
 *      security:
 *       - BearerAuth: []
 *      tags: [Courses]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The book id
 *      requestBody:
 *        description: A JSON object containing course
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CourseRequest'
 *      responses:
 *        200:
 *          description: Status success and information of the updated course will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/CourseResponse'
 *        400:
 *          description: Something wrong while update course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.put(
  '/:id',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

// instructor of course
/**
 * @swagger
 * /courses/{id}:
 *    delete:
 *      summary: Delete course of instructor
 *      security:
 *       - BearerAuth: []
 *      tags: [Courses]
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The id of course
 *      responses:
 *        200:
 *          description: Status success and data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: number
 *        400:
 *          description: Something wrong while get course
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.delete(
  '/:id',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  CoursesController.delete
);

export default router;
