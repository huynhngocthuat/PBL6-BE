import express from 'express';
import { AdminsController } from 'controllers';

const router = express.Router();

router.get('', AdminsController.statisticOverview);

export default router;
