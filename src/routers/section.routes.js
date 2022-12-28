import express from 'express';
import { SectionsController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: The section managing API
 */

router.get('/', SectionsController.get);

router.get('/:id', ValidatorId, SectionsController.get);

router.get('/:id/videos', ValidatorId, SectionsController.getVideos);

router.post(
  '/',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorBody('section'),
  SectionsController.create
);

router.put(
  '/:id',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorBody('section'),
  SectionsController.update
);

router.delete('/:id', ValidatorId, SectionsController.delete);

export default router;
