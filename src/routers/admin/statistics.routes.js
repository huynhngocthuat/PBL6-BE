import express from 'express';
import { AdminsController } from 'controllers';

const router = express.Router();

router.get('', AdminsController.statisticOverview);
router.get('/sold-courses', AdminsController.getAllSoldCourses);

export default router;
