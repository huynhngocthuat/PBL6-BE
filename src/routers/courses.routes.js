import express from 'express';
import { CoursesController } from 'controllers';
import multer from 'multer';
import { ValidatorBody } from 'validations';

const upload = multer();
const router = express.Router();

router.post(
  '/',
  upload.single('thumbnail'),
  ValidatorBody('course'),
  CoursesController.create
);

export default router;
