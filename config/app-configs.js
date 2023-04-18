const config = {
  test: {
    useMocks:
      typeof process.env.USE_MOCKS !== 'undefined'
        ? process.env.USE_MOCKS === 'true'
        : true,
    testAssertTimeoutMS:
      parseInt(process.env.TEST_ASSERT_TIMEOUT_MS, 10) || 4000,
    fullTestTimeoutMs: parseInt(process.env.FULL_TEST_TIMEOUT_MS, 10) || 5000,
  },
};

module.exports = config;
