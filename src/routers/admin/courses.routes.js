import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorId } from 'validations';

const router = express.Router();

router.get('/highest-sold-quantity', CoursesController.getHighestRevenueCourse);

router.get('/action', CoursesController.actionCourse);

router.get('/', CoursesController.getCoursesForAdmin);

router.get('/:id', ValidatorId, CoursesController.getCoursesForAdmin);

export default router;
