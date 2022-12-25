import express from 'express';
import users from './users.routes';
import statistics from './statistics.routes';
import auth from './auth.routes';
import soldCourses from './sold-courses.routes';
import categoryTopics from './categoryTopics.routes';
import courses from './courses.routes';

const router = express.Router();

router.use('', auth);

// middleware check authen and author

router.use('/category-topics', categoryTopics);
router.use('/users', users);
router.use('/courses', courses);
router.use('/statistics', statistics);
router.use('/sold-courses', soldCourses);

export default router;
