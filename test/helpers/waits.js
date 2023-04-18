const waitForExpect = require('wait-for-expect');
const config = require('config');
const UsersDB = require('src/database/users-db');

const waitForCondition = async (expectFunc) => {
  await waitForExpect(async () => {
    await expectFunc();
  }, config('test:testAssertTimeoutMS'));
};

const waitForUser = async (user) => {
  const expectUser = async () => {
    const currentUsers = await UsersDB.getAllUsers();
    expect(currentUsers).toContain(user);
  };

  await waitForCondition(expectUser);
};

module.exports = {
  waitForCondition,
  waitForUser,
};
