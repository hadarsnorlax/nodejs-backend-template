const config = require('config');
const MongoInterface = require('utils/db');
const bookSchema = require('src/api/models/book-schema');

class BooksMongo extends MongoInterface {
  constructor() {
    super(config('mongo:url'), config('mongo:dbName'));
  }

  async getBook(id) {
    try {
      const book = await super.getCollection('books').findOne({ _id: id });
      return book;
    } catch (err) {
      throw Error(`Failed to get book ${id} from DB, error: ${err}`);
    }
  }

  async insertBook(book) {
    const validation = bookSchema.validate(book);
    if (validation.error) {
      throw Error(`Book validation failed: ${validation.error.details}`);
    }

    try {
      await super.getCollection('books').insertOne(book);
    } catch (err) {
      throw Error(`Failed to insert book to DB, error: ${err}`);
    }
  }
}

module.exports = new BooksMongo();
