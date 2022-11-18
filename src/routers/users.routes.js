import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody } from 'validations';
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

export default router;
