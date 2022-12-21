import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody } from 'validations';

const router = express.Router();

router.get('/', UserController.getUserRoleIsUserOrInstructor);
router.get('/requests', UserController.getRequestsOfUser);
router.post(
  '/request/answer-request-instructor',
  ValidatorBody('answerRequest'),
  UserController.answerRequestBecomeToInstructor
);

export default router;
