import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';

const router = express.Router();

router.get('/', CoursesController.get);

router.get('/:id', ValidatorId, CoursesController.get);

router.post('/', ValidatorBody('course'), CoursesController.create);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

router.delete('/:id', ValidatorId, CoursesController.delete);

export default router;
