import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody, ValidatorParams } from 'validations';
import AuthMiddleware from 'middlewares/auth';

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

router.get('/:id/videoviews', UserController.getVideoViewOfUser);

router.get('/:id', ValidatorParams('id'), UserController.getUserById);

router.put(
  '/update-view',
  ValidatorBody('videoView'),
  UserController.updateViewOfUserForVideo
);

export default router;
