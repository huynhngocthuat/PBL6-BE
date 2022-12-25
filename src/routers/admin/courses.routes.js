import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorId } from 'validations';

const router = express.Router();

router.get('/', CoursesController.getCoursesForAdmin);

router.get('/:id', ValidatorId, CoursesController.getCoursesForAdmin);

export default router;
