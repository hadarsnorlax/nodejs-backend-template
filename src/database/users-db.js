const config = require('config');
const MongoInterface = require('utils/db');

class UsersMongo extends MongoInterface {
  constructor() {
    super(config('mongo:url'), config('mongo:dbName'));
    this.users = super.getCollection('users');
  }

  async getAllUsers() {
    try {
      const users = await this.users.find({}).toArray();
      return users;
    } catch (err) {
      throw Error(`Failed to get all users from DB, error: ${err}`);
    }
  }

  async insertUser(user) {
    try {
      await this.users.insertOne(user);
    } catch (err) {
      throw Error(`Failed to insert user to DB, error: ${err}`);
    }
  }
}

module.exports = new UsersMongo();
