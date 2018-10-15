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

  get isPublicNetwork() {
    return env.useStellarPublicNetwork || false;
  }

  get isTestNetwork() {
    return !this.isPublicNetwork;
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

  get recaptchaSiteKey() {
    return env.recaptchaSiteKey;
  }

  get recaptchaSecret() {
    return env.recaptchaSecret;
  }

  get isRecaptchaEnabled() {
    return this.recaptchaSiteKey && this.recaptchaSecret;
  }

  get otpSecret() {
    return env.sessionSecret;
  }
}

const config = new Config();

module.exports = config;
