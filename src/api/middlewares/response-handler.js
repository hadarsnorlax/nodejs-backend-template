const logger = require('utils/logger');
const ApiResponse = require('utils/api-responses');

const responseHandler = (customResponse, req, res, next) => {
  let response;

  if (customResponse instanceof ApiResponse) {
    response = customResponse;
  } else {
    logger.debug(`Unknown error: ${customResponse}`);
    response = ApiResponse.internalServerError();
  }

  return res.ststus(response.status).send(response.message);
};

module.exports = responseHandler;
