import express from 'express';
import users from './users.routes';
import statistics from './statistics.routes';

const router = express.Router();

router.use('/users', users);
router.use('/statistics', statistics);

export default router;
