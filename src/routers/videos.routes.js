import express from 'express';
import { VideosController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: The video managing API
 */

router.get('/', VideosController.get);
router.get('/:id', ValidatorId, VideosController.get);
router.get('/:id/user', ValidatorId, VideosController.getInstructorUploadVideo);

router.post(
  '/',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorBody('video'),
  VideosController.create
);

router.put(
  '/:id',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  ValidatorBody('video'),
  VideosController.update
);

router.delete(
  '/:id',
  AuthMiddleware.isRequired,
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  ValidatorId,
  VideosController.delete
);

export default router;
