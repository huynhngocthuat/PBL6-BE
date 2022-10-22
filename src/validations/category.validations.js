import { CategoryTopicsService as categoryTopicService } from "services";
import { errors, httpCodes, messages } from "constants";
import Response from "helpers/response";
import { json } from "utils";

export async function ValidatorName(req, res, next) {
  const { name } = req.body;
  const condition = {
    name: {
      $iLike: `${name}`,
    },
  };

  try {
    const categoryTopic = await categoryTopicService.getCategoryByCondition(
      condition
    );

    // if the name categoryTopic already existed response error
    if (categoryTopic) {
      return Response.error(res, {
        message: messages.MESS_EXISTED_NAME.format("category topic"),
      });
    }

    next();
  } catch (error) {
    return Response.error(res, error);
  }
}

export async function ValidatorNameUpdate(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // get category topic
    const data = await categoryTopicService.get(id);

    if (data) {
      const categoryTopic = json(data);

      // name's category topic like old name to pass
      if (categoryTopic.name === name) {
        next();
      } else {
        // check the update name category topic existed ?
        const condition = {
          name: {
            $iLike: `${name}`,
          },
        };

        const data = await categoryTopicService.getCategoryByCondition(
          condition
        );
        console.log(data);
        // return error if the update name has existed
        if (data) {
          Response.error(res, {
            errors: errors.ERR_WHILE_UPDATE.format("category topic"),
            message: messages.MESS_EXISTED_NAME.format("category topic"),
          });
        } else {
          next();
        }
      }
    } else {
      return Response.error(res, {
        errors: errors.ERR_WHILE_UPDATE.format("category topic"),
        message: messages.MESS_NOT_EXIST_ID.format("category topic"),
      });
    }
  } catch (error) {
    return Response.error(res, {
      errors: errors.ERR_WHILE_UPDATE.format("category topic"),
    });
  }
}
