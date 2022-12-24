import express from 'express';
import users from './users.routes';
import statistics from './statistics.routes';
import soldCourses from './sold-courses.routes';

const router = express.Router();

router.use('/users', users);
router.use('/statistics', statistics);
router.use('/sold-courses', soldCourses);

export default router;
