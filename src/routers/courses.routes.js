import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

router.get('/:id/analysis', CoursesController.analysisCourseOfInstructor);
router.get(
  '/search',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.USER_ROLE, roles.INSTRUCTOR_ROLE),
  CoursesController.search
);
router.get(
  '/',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.USER_ROLE, roles.INSTRUCTOR_ROLE),
  CoursesController.get
);

router.get('/:id', ValidatorId, CoursesController.get);
router.get('/:id/sections', ValidatorId, CoursesController.getSections);

router.post('/', ValidatorBody('course'), CoursesController.create);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

router.delete('/:id', ValidatorId, CoursesController.delete);

export default router;
