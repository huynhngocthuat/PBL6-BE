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

export default router;
