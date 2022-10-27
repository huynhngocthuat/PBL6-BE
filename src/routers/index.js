import express from 'express';
import users from './users.routes';
import auth from './auth.routes';
import categoryTopics from './categoryTopics.routes';
import courses from './courses.routes';
import sections from './section.routes';
import upload from './upload.routes';

const router = express.Router();

router.use('/', users);
router.use('/', auth);
router.use('/category-topics', categoryTopics);
router.use('/courses', courses);
router.use('/sections', sections);
router.use('/upload', upload);

export default router;
