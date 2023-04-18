const axios = require('axios');
const logger = require('utils/logger');
const ApiResponse = require('utils/api-responses');

const getFullUrl = (url, query) => {
  if (query === undefined) {
    return url;
  }
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};

// Return handled response error from axios request catch
const getHandledError = (error, reqLog) => {
  const response = error.response || ApiResponse.internalServerError();
  const errorMsg =
    error.response !== undefined
      ? response.data || response.message
      : error.message || response.message;

  logger.error(
    `${reqLog} | code: ${response.status} | ${JSON.stringify(errorMsg)}`,
  );
  return response;
};

class Requestor {
  constructor(url, auth = {}) {
    this.url = url;
    this.auth = auth;
  }

  request(method, route = '', options = {}) {
    const url = this.url + route;
    const querifyUrl = getFullUrl(url, options.params);
    const requestLog = `request ${method.toUpperCase()} ${querifyUrl}`;
    logger.info(requestLog);

    const basicConfig = {
      url,
      method,
    };

    const reqConfig = { ...basicConfig, ...this.auth, ...options };
    return axios(reqConfig).catch((error) =>
      getHandledError(error, requestLog),
    );
  }
}

module.exports = Requestor;
