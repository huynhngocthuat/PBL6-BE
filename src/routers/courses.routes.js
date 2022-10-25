import express from 'express';
import { CoursesController } from 'controllers';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.post('/', upload.single('thumbnail'), CoursesController.create);

export default router;
