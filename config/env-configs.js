const config = {
  express: {
    port: parseInt(process.env.EXPRESS_PORT, 10) || 8000,
    host: process.env.EXPRESS_HOST || 'localhost',
  },
  mongo: {
    dbName: process.env.DB_NAME || 'NodeBackendDB',
    dbHost: process.env.DB_HOST || 'localhost',
  },
  someExternalApi: {
    url: process.env.EXTERNAL_API || 'http://some-api',
  },
};

config.express.url = `http://${config.express.host}:${config.express.port}`;
config.mongo.url = `mongodb://${config.mongo.dbHost}:27017/${config.mongo.dbName}`;

module.exports = config;
