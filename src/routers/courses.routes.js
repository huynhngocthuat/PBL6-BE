import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';

const router = express.Router();

router.get('/:id/analysis', CoursesController.analysisCourseOfInstructor);
router.get('/search', CoursesController.search);
router.get('/', CoursesController.get);

router.get('/:id', ValidatorId, CoursesController.get);
router.get('/:id/sections', ValidatorId, CoursesController.getSections);

router.post(
  '/check-finish-course',
  ValidatorBody('checkFinishCourse'),
  CoursesController.checkUserFinishCourse
);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

router.delete('/:id', ValidatorId, CoursesController.delete);
router.post('/:id', ValidatorId, CoursesController.delete);

export default router;
