const env = {
  devMode: !!process.env.DEV_MODE,

  port: process.env.port || 3000,

  sessionSecret: process.env.SESSION_SECRET,
  useStellarPublicNetwork: !!process.env.USE_STELLAR_PUBLIC_NETWORK,

  domainName: process.env.DOMAIN_NAME,
  sendGridApiKey: process.env.SEND_GRID_API_KEY,

  recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  recaptchaSecret: process.env.RECAPTCHA_SECRET,

  // postgres
  pgHost: process.env.PG_HOST,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD
};

function validateEnv(env) {
  if (!env.sessionSecret) {
    throw 'Missing SESSION_SECRET';
  }
}

validateEnv(env);

module.exports = env;
