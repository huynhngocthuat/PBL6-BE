import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody, ValidatorParams } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /users/{id}/courses:
 *    get:
 *      summary: Get courses of instructor
 *      tags: [Users]
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
router.get('/:id/courses', UserController.getCourses);

router.put(
  '/update-avatar',
  AuthMiddleware.isRequired,
  ValidatorBody('avatar'),
  UserController.uploadAvatar
);

router.put(
  '/update-profile',
  ValidatorBody('updateProfile'),
  AuthMiddleware.isRequired,
  AuthMiddleware.isUser,
  UserController.updateProfile
);

router.get(
  '/details',
  AuthMiddleware.isRequired,
  AuthMiddleware.isUser,
  UserController.getUserDetails
);

router.get(
  '/check-request',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.USER_ROLE),
  UserController.checkRequestOfUser
);

router.get(
  '/:id/videos/:idVideo/videoviews',
  UserController.getVideoViewOfUser
);

router.get('/:id', ValidatorParams('id'), UserController.getUserById);

router.put(
  '/update-view',
  ValidatorBody('videoView'),
  UserController.updateViewOfUserForVideo
);

router.post(
  '/request-instructor',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.USER_ROLE),
  UserController.requestBecomeToInstructor
);

export default router;
