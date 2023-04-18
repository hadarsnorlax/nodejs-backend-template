const nock = require('nock');
const config = require('config');
const Requestor = require('src/requestor/some-api-requestor');

class SomeApiMocks {
  constructor() {
    this.url = config('someExternalApi:url');
    this.requestor = Requestor();
  }

  healthyServer() {
    nock(this.url).get('/health').reply(200, { ok: true, uptime: new Date() });
  }

  insertEmptyFood() {
    nock(this.url).post('/food').reply(404, 'Food is missing');
  }

  getSomeFood() {
    nock(this.url)
      .get('/food')
      .query(true)
      .reply(200, { price: 15, tasty: true });
  }
}

const destroyMocks = (mockClass) => {
  Object.getOwnPropertyNames(mockClass.prototype).forEach((mockName) => {
    // eslint-disable-next-line no-param-reassign
    mockClass.prototype[mockName] = () => {};
  });
};

const configMocks = (mockClass) => {
  // Disable in prod env
  const useMocks = config('test:useMocks');

  if (!useMocks) {
    destroyMocks(mockClass);
  }
};

configMocks(SomeApiMocks);

module.exports = SomeApiMocks;
