import * as Schemas from 'commons/schemas';
import Response from 'helpers/response';
import { validate as uuidValidate } from 'uuid';
import { messages, errors } from 'constants';
import { json } from 'utils';

export function ValidatorBody(validator) {
  // eslint-disable-next-line no-prototype-builtins
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  // eslint-disable-next-line consistent-return, func-names
  return async function (req, res, next) {
    try {
      const validated = await Schemas[validator].validateAsync(req.body);
      req.body = validated;

      next();
    } catch (err) {
      return Response.error(res, {
        message: err.message,
      });
    }
  };
}

export function ValidatorParams(validator) {
  // eslint-disable-next-line no-prototype-builtins
  if (!Schemas.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  // eslint-disable-next-line consistent-return
  return async function validate(req, res, next) {
    try {
      const validated = await Schemas[validator].validateAsync(req.params);
      req.params = validated;

      next();
    } catch (err) {
      return Response.error(res, {
        message: err.message,
      });
    }
  };
}

export function ValidatorId(req, res, next) {
  const { id } = req.params;
  const isUuid = uuidValidate(id);
  if (isUuid) {
    next();
    return;
  }

  Response.error(res, {
    message: messages.INVALID_ID,
  });
}

export function ValidatorName(service, nameModel) {
  // eslint-disable-next-line func-names, consistent-return
  return async function (req, res, next) {
    const { name } = req.body;
    const condition = {
      name: {
        $iLike: `${name}`,
      },
    };

    try {
      const data = await service.findOneByCondition(condition);

      // if the name of model already existed response error
      if (data) {
        return Response.error(res, {
          message: messages.EXISTED_NAME.format(nameModel),
        });
      }

      next();
    } catch (error) {
      return Response.error(res, error);
    }
  };
}

export function ValidatorNameUpdate(service, nameModel) {
  // eslint-disable-next-line func-names, consistent-return
  return async function (req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      // get data is updated
      const dataUpdate = await service.find(id);

      if (dataUpdate) {
        const jsonData = json(dataUpdate);

        // name's category topic like old name to pass
        if (jsonData.name === name) {
          next();
        } else {
          // check the update name category topic existed ?
          const condition = {
            name: {
              $iLike: `${name}`,
            },
          };

          const data = await service.findOneByCondition(condition);

          if (data) {
            Response.error(res, {
              errors: errors.WHILE_UPDATE.format(nameModel),
              message: messages.EXISTED_NAME.format(nameModel),
            });
          } else {
            next();
          }
        }
      } else {
        return Response.error(res, {
          errors: errors.WHILE_UPDATE.format(nameModel),
          message: messages.NOT_EXIST_ID.format(nameModel),
        });
      }
    } catch (error) {
      return Response.error(res, {
        errors: errors.WHILE_UPDATE.format(nameModel),
      });
    }
  };
}
