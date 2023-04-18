const { MongoClient } = require('mongodb');
const logger = require('utils/logger');

class MongoInterface {
  constructor(mongoUrl, dbName) {
    this.dbName = dbName;
    this.mongoUrl = mongoUrl;
    this.client = new MongoClient(mongoUrl);
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      logger.info('Connected successfully to MongoDB');
    } catch (err) {
      logger.error(
        `Failed connecting to DB: ${this.mongoUrl}, error: ${err.message}`,
      );
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      logger.info('Disconnected successfully from MongoDB');
    } catch (err) {
      logger.error(
        `Failed disconnecting to DB: ${this.mongoUrl}, error: ${err.message}`,
      );
    }
  }

  async clearDB() {
    try {
      const collections = await this.db.listCollections().toArray();
      const deletePromises = collections.map((collection) =>
        this.db.collection(collection.name).deleteMany({}),
      );
      await Promise.all(deletePromises);
    } catch (err) {
      throw Error(`Failed to clear the entire DB, error: ${err.message}`);
    }
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }
}

module.exports = MongoInterface;
