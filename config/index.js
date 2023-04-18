const nconf = require('nconf');
const appConfig = require('config/app-configs');
const envConfig = require('config/env-configs');

const env = process.env.NODE_ENV || 'dev';

nconf.use('memory');
nconf.argv().env(env);
nconf.set('env', env);
nconf.defaults(appConfig);
nconf.overrides(envConfig);

const getConfig = (key) => nconf.get(key);

module.exports = getConfig;
