const config = require('config');
const MongoInterface = require('utils/db');

class BooksMongo extends MongoInterface {
  constructor() {
    super(config('mongo:url'), config('mongo:dbName'));
    this.books = super.getCollection('books');
  }

  async getBook(id) {
    try {
      const book = await this.books.findOne({ _id: id });
      return book;
    } catch (err) {
      throw Error(`Failed to get book ${id} from DB, error: ${err}`);
    }
  }

  async insertBook(book) {
    try {
      await this.books.insertOne(book);
    } catch (err) {
      throw Error(`Failed to insert book to DB, error: ${err}`);
    }
  }
}

module.exports = new BooksMongo();
