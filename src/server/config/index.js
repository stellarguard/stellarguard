const pg = require('./pg');
const env = require('./env');

class Config {
  get sessionSecret() {
    return env.sessionSecret;
  }

  get hmacSecret() {
    return this.sessionSecret;
  }

  get cryptoSecret() {
    return this.sessionSecret;
  }

  get pg() {
    return pg;
  }

  get useStellarPublicNetwork() {
    return env.useStellarPublicNetwork || false;
  }

  get useStellarTestNetwork() {
    return !this.useStellarPublicNetwork;
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

  get stellarGuardPublicKey() {
    return 'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD';
  }

  get useGoogleKms() {
    return !env.devMode;
  }
}

const config = new Config();

module.exports = config;
