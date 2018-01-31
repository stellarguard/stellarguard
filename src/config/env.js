const env = {
  signerSecretKey: process.env.SIGNER_SECRET_KEY,
  sessionSecret: process.env.SESSION_SECRET,
  useStellarPublicNetwork: process.env.USE_STELLAR_PUBLIC_NETWORK,
  devMode: !!process.env.DEV_MODE,
  domainName: process.env.DOMAIN_NAME || 'localhost:3000',
  port: process.env.port || 3000,
  sendGridApiKey: process.env.SEND_GRID_API_KEY
};

function validateEnv(env) {
  if (!env.signerSecretKey) {
    throw 'Missing SIGNER_SECRET_KEY env variable.';
  }
}

env.devMode || validateEnv(env);

module.exports = env;
