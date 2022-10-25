import express from 'express';
import { CoursesController } from 'controllers';
import multer from 'multer';
import { ValidatorBody, ValidatorId } from 'validations';

const upload = multer();
const router = express.Router();

router.get('/', CoursesController.get);

router.get('/:id', ValidatorId, CoursesController.get);

router.post(
  '/',
  upload.single('thumbnail'),
  ValidatorBody('course'),
  CoursesController.create
);

router.put(
  '/:id',
  ValidatorId,
  upload.single('thumbnail'),
  ValidatorBody('course'),
  CoursesController.update
);

router.delete('/:id', ValidatorId, CoursesController.delete);

export default router;
