const pg = require('./pg');
const env = require('./env');

class Config {
  get sessionSecret() {
    return env.sessionSecret;
  }

  get hmacSecret() {
    return this.sessionSecret;
  }

  get pg() {
    return pg;
  }

  get useStellarPublicNetwork() {
    return env.useStellarPublicNetwork || false;
  }

  get isDevMode() {
    return env.devMode || false;
  }

  get sendGridApiKey() {
    return env.sendGridApiKey;
  }

  get domainName() {
    return env.domainName;
  }
}

const config = new Config();

module.exports = config;
