const ApiResponse = require('utils/api-responses');
const UserDB = require('src/database/users-db');
const logger = require('utils/logger');

const insertUser = async (req, res, next) => {
  const user = req.body;

  if (Object.keys(user).length === 0) {
    return next(ApiResponse.badRequest('User is missing'));
  }

  try {
    await UserDB.insertUser(user);
    return next(ApiResponse.created());
  } catch (err) {
    if (err.includes('validation failed')) {
      return next(ApiResponse.badRequest(err));
    }

    logger.debug(`Unknown error on user insertion, error: ${err}`);
    return next(ApiResponse.internalServerError());
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await UserDB.getAllUsers(id);
    return next(users);
  } catch (err) {
    logger.debug(`Unknown error on user insertion, error: ${err}`);
    return next(ApiResponse.internalServerError());
  }
};

module.exports = {
  insertUser,
  getUsers,
};
