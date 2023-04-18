const { statusCodes } = require('utils/constants');

const getErrorMsg = (errors) => {
  /*
    Return response as:
    {
      "errors": [
        "Something went wrong"
      ]
    }
  */
  const message = {};
  message.errors = Array.isArray(errors) ? errors : [errors];
  return message;
};

class ApiResponse {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static created() {
    return new ApiResponse(statusCodes.CREATED, 'ok');
  }

  static recieved(message) {
    return new ApiResponse(statusCodes.ACCEPTED, message);
  }

  static badRequest(errors) {
    return new ApiResponse(statusCodes.BAD_REQUEST, getErrorMsg(errors));
  }

  static internalServerError() {
    return new ApiResponse(
      statusCodes.INTERNAL_SERVER_ERROR,
      getErrorMsg('Something went wrong'),
    );
  }

  static invalidPathError() {
    return new ApiResponse(statusCodes.NOT_FOUND, getErrorMsg('Invalid Path'));
  }
}

module.exports = ApiResponse;
