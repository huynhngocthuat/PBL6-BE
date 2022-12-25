import { actions } from 'constants';
import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const activatedAction = Joi.object({
  action: Joi.string()
    .trim()
    .required()
    .custom((value, helper) => {
      if (
        value.toUpperCase() !== actions.ACTION_ACTIVATED &&
        value.toUpperCase() !== actions.ACTION_DEACTIVED
      ) {
        return helper.message('Action must be ACTIVATED or DEACTIVATED');
      }

      return value;
    }),
});
