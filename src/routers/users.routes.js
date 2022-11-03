import express from 'express';
import { UserController } from 'controllers';

const router = express.Router();

router.get('/courses/:id', UserController.getCourses);

export default router;
