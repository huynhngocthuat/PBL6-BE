// https://github.com/cryptlex/rest-api-response-format
import { httpCodes } from 'constants';

export default class Response {
  static success(res, data, status = httpCodes.STATUS_OK) {
    res.status(status);
    if (data) {
      return res.json({
        status: 'success',
        data: data.docs,
        pagination: data.pagination,
      });
    }

    return res.json({
      status: 'success',
      data,
    });
  }

  static error(res, error, status = httpCodes.STATUS_BAD_REQUEST) {
    res.status(status);
    return res.json({
      success: 'failed',
      error: {
        message: error.message || null,
        code: error.code || httpCodes.STATUS_BAD_REQUEST,
        errors: error.errors || null,
      },
    });
  }
}
