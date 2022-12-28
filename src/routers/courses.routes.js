import express from 'express';
import { CoursesController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import { CoursesService } from 'services';
import { errors } from 'constants';
import Response from 'helpers/response';
import { json } from 'utils';

const router = express.Router();

router.get(
  '/:id/public',
  ValidatorId,
  // eslint-disable-next-line consistent-return
  async (req, res, next) => {
    const { id } = req.params;
    const course = await CoursesService.getCourseById(id);

    if (course) {
      const jsonCourse = json(course);

      if (jsonCourse.isPublic) {
        return Response.error(res, {
          message: errors.COURSE_ALREADY_PUBLIC,
        });
      }
      next();
    } else {
      return Response.error(res, {
        message: errors.NOT_EXIST.format('course'),
      });
    }
  },
  CoursesController.publicCourse
);

router.get('/:id/analysis', CoursesController.analysisCourseOfInstructor);
router.get('/search', CoursesController.search);
router.get('/', CoursesController.get);

router.get('/:id', ValidatorId, CoursesController.get);
router.get('/:id/sections', ValidatorId, CoursesController.getSections);

router.post('/', ValidatorBody('course'), CoursesController.create);

router.post(
  '/check-finish-course',
  ValidatorBody('checkFinishCourse'),
  CoursesController.checkUserFinishCourse
);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('course'),
  CoursesController.update
);

router.delete('/:id', ValidatorId, CoursesController.delete);

export default router;
