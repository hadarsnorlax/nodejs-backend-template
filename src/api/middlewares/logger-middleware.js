const logger = require('utils/logger');

const isSuccessCode = (code) => code >= 200 && code < 300;

const loggerMiddleware = (customResponse, req, res, next) => {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const code = res.statusCode;
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    const message = `response ${req.method} ${req.originalUrl} | code ${code} | duration: ${duration}ms`;

    if (isSuccessCode(code)) {
      logger.info(message);
    } else {
      const error = customResponse.message.errors || 'Something went wrong';
      logger.error(`${message} | errors: [ ${error} ]`);
    }
  });

  next(customResponse);
};

module.exports = loggerMiddleware;
