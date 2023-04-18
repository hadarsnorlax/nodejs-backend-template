const config = require('config');
const Requestor = require('src/requestors/requestor-template');
const { apiMethods } = require('utils/constants');

class SomeApiRequestor extends Requestor {
  constructor() {
    super(config('someExternalApi:url'));

    this.routes = {
      health: '/health',
      food: '/food',
    };
  }

  getHealth() {
    return this.request(apiMethods.GET, this.routes.health);
  }

  insertFood(food) {
    return this.request(apiMethods.POST, this.routes.food, { data: food });
  }

  getFood(priceQuery = undefined) {
    const options = priceQuery !== undefined ? { params: { priceQuery } } : {};
    return this.request(apiMethods.GET, this.routes.food, options);
  }
}

module.exports = SomeApiRequestor;
