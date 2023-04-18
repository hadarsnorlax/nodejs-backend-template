const ApiResponse = require('utils/api-responses');
const BooksDB = require('src/database/books-db');
const logger = require('utils/logger');

const insertBook = async (req, res, next) => {
  const book = req.body;

  if (Object.keys(book).length === 0) {
    return next(ApiResponse.badRequest('Book is missing'));
  }

  try {
    await BooksDB.insertBook(book);
    return next(ApiResponse.created());
  } catch (err) {
    if (err.includes('validation failed')) {
      return next(ApiResponse.badRequest(err));
    }

    logger.debug(`Unknown error on book insertion, error: ${err}`);
    return next(ApiResponse.internalServerError());
  }
};

const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BooksDB.getBook(id);
    if (book) return next(book);
    return next(ApiResponse.notFound(`Not found Book with id: ${id}`));
  } catch (err) {
    logger.debug(`Unknown error on book insertion, error: ${err}`);
    return next(ApiResponse.internalServerError());
  }
};

module.exports = {
  insertBook,
  getBook,
};
