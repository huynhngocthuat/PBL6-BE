import express from 'express';
import { AdminsController, UserController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';
import { userStatussService, UsersService } from 'services';
import Response from 'helpers/response';
import { status, errors, actions } from 'constants';
import { json } from 'utils';

const router = express.Router();

router.get('/', UserController.getUserRoleIsUserOrInstructor);
router.get('/requests', UserController.getRequestsOfUser);

router.get(
  '/requests/statistic',
  UserController.statisticRequestBecomeToInstructor
);

router.get('/detail/:id', ValidatorId, AdminsController.getUserDetail);

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
        return next();
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

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('activatedAction'),
  // eslint-disable-next-line consistent-return
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { action } = req.body;

      const data = await UsersService.findOneByCondition({
        id,
      });

      let jsonData;
      if (data) {
        jsonData = json(data);
        if (
          jsonData.isActivated === true &&
          action === actions.ACTION_DEACTIVED
        ) {
          next();
        } else if (
          jsonData.isActivated === false &&
          action === actions.ACTION_ACTIVATED
        ) {
          next();
        } else {
          return Response.error(res, {
            message: errors.ERR_ACTION_IS_INVALID,
          });
        }
      } else {
        return Response.error(res, {
          message: errors.USER_NOT_FOUND,
        });
      }
    } catch (error) {
      return Response.error(res, {
        message: errors.ERR_WHILE_ACTIVATION_USER,
      });
    }
  },
  AdminsController.activationUser
);

export default router;
