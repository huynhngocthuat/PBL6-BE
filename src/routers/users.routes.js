import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody, ValidatorParams } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

router.get('/courses/:id', UserController.getCourses);

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
