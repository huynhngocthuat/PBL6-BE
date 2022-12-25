import { actions, errors } from 'constants';
import Joi from 'joi';
import { userStatussService } from 'services';

export const userRequestIdExist = Joi.object({
  id: Joi.string()
    .trim()
    .uuid()
    .required()
    .external(async (id) => {
      try {
        const data = await userStatussService.findOneByCondition({
          id,
        });

        if (!data) {
          throw new Error(errors.NOT_EXIST.format('user request'));
        }
      } catch (error) {
        if (
          String(error) === `Error: ${errors.NOT_EXIST.format('user request')}`
        ) {
          throw new Error(error);
        } else {
          throw new Error(errors.DATA_INVALID.format('user request'));
        }
      }
    }),
});

export const answerRequest = Joi.object({
  action: Joi.string()
    .trim()
    .required()
    .custom((value, helper) => {
      if (
        value.toUpperCase() !== actions.ACTION_ACCEPT_REQUEST_TO_INSRUCTOR &&
        value.toUpperCase() !== actions.ACTION_DENIED_REQUEST_TO_INSTRUCTOR
      ) {
        return helper.message('Action must be ACCEPT or DENY');
      }

      return value;
    }),
  reason: Joi.string().when('action', {
    is: actions.ACTION_DENIED_REQUEST_TO_INSTRUCTOR,
    then: Joi.string().trim().min(8).required(),
  }),
}).concat(userRequestIdExist);
