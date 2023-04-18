const axios = require('axios');
const config = require('config');
const { statusCodes } = require('utils/constants');
const { startServer, stopServer } = require('src/api/server');

describe('Express Middlewares', () => {
  beforeAll(async () => {
    await startServer(config('express:port'));
  });

  afterAll(async () => {
    await stopServer();
  });

  it('Should return 404 status code if path is invalid', async () => {
    const response = await axios
      .get(`${config('express:url')}/unknown-route`)
      .catch((error) => error.response);
    expect(response.status).toEqual(statusCodes.NOT_FOUND);
  });
});
