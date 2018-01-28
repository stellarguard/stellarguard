const env = {
  signerSecretKey: process.env.SIGNER_SECRET_KEY
};

function validateEnv(env) {
  if (!env.signerSecretKey) {
    throw 'Missing SIGNER_SECRET_KEY env variable.';
  }
}

validateEnv(env);

module.exports = env;
