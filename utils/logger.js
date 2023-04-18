const winston = require('winston');
const config = require('config');

const levels = {
  noLogs: -1,
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'white',
};

winston.addColors(colors);

/*
 * Set the current security based on NODE_ENV
 * in dev: show all the log levels
 * in prod: show only warn and error messages
 */
const setLevel = () => {
  const envLevels = {
    prod: 'info',
    dev: 'debug',
    test: 'debug',
  };

  return envLevels[config('env')] || 'info';
};

const testShowOnlyDebug = winston.format((info) => {
  if (config('env') === 'test') {
    return info.level === 'debug' ? info : false;
  }
  return info;
});

const format = winston.format.combine(
  testShowOnlyDebug(),
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} | ${info.level} | ${info.message}`,
  ),
);

const getTransports = () => {
  const transports = [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
  ];

  return transports;
};

const logger = winston.createLogger({
  level: setLevel(),
  levels,
  format,
  transports: getTransports(),
});

module.exports = logger;
