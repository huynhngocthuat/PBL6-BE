import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorId } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

router.get(
  '/',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.ADMIN_ROLE),
  CoursesController.getCoursesForAdmin
);

router.get(
  '/:id',
  ValidatorId,
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.ADMIN_ROLE),
  CoursesController.getCoursesForAdmin
);

export default router;
