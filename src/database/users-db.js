const config = require('config');
const MongoInterface = require('utils/db');
const userSchema = require('src/api/models/user-schema');

class UsersMongo extends MongoInterface {
  constructor() {
    super(config('mongo:url'), config('mongo:dbName'));
  }

  async getAllUsers() {
    try {
      const users = await super.getCollection('users').find({}).toArray();
      return users;
    } catch (err) {
      throw Error(`Failed to get all users from DB, error: ${err}`);
    }
  }

  async insertUser(user) {
    const validation = userSchema.validate(user);
    if (validation.error) {
      throw Error(`User validation failed: ${validation.error.details}`);
    }

    try {
      await super.getCollection('users').insertOne(user);
    } catch (err) {
      throw Error(`Failed to insert user to DB, error: ${err}`);
    }
  }
}

module.exports = new UsersMongo();
