const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('utils/logger');
const booksRoute = require('src/api/routes/books');
const usersRoute = require('src/api/routes/users');
const responseHandler = require('src/api/middlewares/response-handler');
const invalidPathHandler = require('src/api/middlewares/invalid-path-handler');
const loggerMiddleware = require('src/api/middlewares/logger-middleware');

const app = express();
let server;

const useRoutes = async () => {
  await app.use('/books', booksRoute);
  await app.use('/users', usersRoute);
};

const useMiddlewares = async () => {
  await app.use(cors());
  await app.use(compression());
  await app.use(bodyParser.json());
  await app.use(helmet());
  await useRoutes();
  await app.use(loggerMiddleware);
  await app.use(responseHandler);
  await app.use(invalidPathHandler);
};

const startServer = async (port) => {
  await useMiddlewares();

  server = await app
    .listen(port, async () => {
      logger.info(`Server is running on port ${port}`);
    })
    .on('error', (err) => {
      logger.error(`Server running has failed on port ${port}, error: ${err}`);
    });
};

const stopServer = async () => {
  try {
    await server.close();
    logger.info('Server is closing...');
  } catch (err) {
    logger.error(`Server closing has failed, error: ${err.message}`);
  }
};

module.exports = {
  startServer,
  stopServer,
};
