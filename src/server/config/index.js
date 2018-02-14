const keys = require('./keys');
const env = require('./env');

class Config {
  get sessionSecret() {
    return env.sessionSecret;
  }

  get hmacSecret() {
    return this.sessionSecret;
  }

  get signerPublicKey() {
    return keys.signerPublicKey;
  }

  get signerSecretKey() {
    return keys.signerSecretKey;
  }

  get useStellarPublicNetwork() {
    return env.useStellarPublicNetwork || false;
  }

  get isDevMode() {
    return env.devMode || false;
  }
}

const config = new Config();

module.exports = config;
