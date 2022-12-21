import express from 'express';
import { UserController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import { userStatussService } from 'services';
import Response from 'helpers/response';
import { status, errors } from 'constants';
import { json } from 'utils';

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
  async (req, res, next) => {
    try {
      const { id } = req.body;
      const data = await userStatussService.findOneByCondition({
        id,
      });

      const jsonData = json(data);
      if (jsonData.status === status.WAITING_STATUS) {
        next();
      }

      return Response.error(res, {
        message: errors.ERR_WHILE_ACTION_NOT_VALID,
      });
    } catch (error) {
      return Response.error(res, {
        message: errors.ERR_WHILE_ANS_REQUEST_BECOME_INSTRUCTOR,
      });
    }
  },
  UserController.answerRequestBecomeToInstructor
);

export default router;
