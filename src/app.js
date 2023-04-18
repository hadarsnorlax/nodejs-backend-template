const config = require('config');
const { startServer } = require('src/api/server');
const BooksDB = require('src/database/books-db');
const UserDB = require('src/database/users-db');
const logger = require('utils/logger');

const startApp = async () => {
  try {
    await BooksDB.connect();
    await UserDB.connect();
    await startServer(config('express:port'));
  } catch (err) {
    logger.error('App failed to start');
  }
};

startApp();
