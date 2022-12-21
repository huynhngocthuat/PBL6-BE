import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';

const router = express.Router();

router.get('/', UserController.getUserRoleIsUserOrInstructor);
router.get('/requests', UserController.getRequestsOfUser);
router.get(
  '/requests/statistic',
  UserController.statisticRequestBecomeToInstructor
);

router.get('/detail/:id', ValidatorId, UserController.getInforDetailOfUser);

router.post(
  '/requests/answer-request-instructor',
  ValidatorBody('answerRequest'),
  UserController.answerRequestBecomeToInstructor
);

export default router;
