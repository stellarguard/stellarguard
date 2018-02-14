const fs = require('fs');
const path = require('path');

const localEnvFile = path.resolve(__dirname, '.env.local');
if (fs.existsSync(localEnvFile)) {
  require('dotenv').config({ path: localEnvFile });
}

const env = {
  signerSecretKey: process.env.STELLAR_SIGNER_SECRET_KEY,
  sessionSecret: process.env.SESSION_SECRET,
  useStellarPublicNetwork: !!process.env.USE_STELLAR_PUBLIC_NETWORK,
  devMode: !!process.env.DEV_MODE,
  domainName: process.env.DOMAIN_NAME,
  port: process.env.port || 3000,
  sendGridApiKey: process.env.SEND_GRID_API_KEY
};

function validateEnv(env) {
  if (!env.signerSecretKey) {
    throw 'Missing STELLAR_SIGNER_SECRET_KEY env variable.';
  }

  if (!env.signerSecretKey) {
    throw 'Missing SESSION_SECRET';
  }
}

validateEnv(env);

module.exports = env;
