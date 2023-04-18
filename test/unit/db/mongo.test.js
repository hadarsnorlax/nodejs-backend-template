const config = require('config');
const MongoInterface = require('utils/db');

const mongo = new MongoInterface(config('mongo:url', config('mongo:dbName')));

describe('MongoInterface class', () => {
  beforeAll(async () => {
    await mongo.connect();
  });

  afterAll(async () => {
    await mongo.disconnect();
  });

  afterEach(async () => {
    await mongo.clearDB();
  });

  it('Should preform operations on a collection', async () => {
    const document = { price: 15, tasty: true };
    const collection = mongo.getCollection('food');

    await collection.insertOne(document);
    const collectionData = await collection.find({}).toArray();

    expect(collectionData).toEqual([document]);
  });
});
