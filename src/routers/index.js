import express from 'express';
import users from './users.routes';
import auth from './auth.routes';
import categoryTopics from './categoryTopics.routes';
// import courses from './courses.routes';

const router = express.Router();

router.use('/', users);
router.use('/', auth);
router.use('/category-topics', categoryTopics);
// router.use("/courses", courses);

export default router;
