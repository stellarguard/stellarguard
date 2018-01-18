const strategiesDb = {
  GCPG4BXCMCD4JSH5EC3SD2HMIGTLNXUZKOUSLP7MEY63HICHNNHI6KO7: {
    type: 'authenticator',
    secret: 'FAZUO4SDOJIVIOTZJJDUGXRIJMSFKS2MHYUDCKBZLN2SQWTRFFNQ'
  }
};

async function getStrategyForPublicKey(publicKey) {
  return strategiesDb[publicKey];
}

async function saveStrategy({ publicKey, type, secret }) {
  const strategy = { publicKey, type, secret };
  strategiesDb[publicKey] = strategy;
  return strategy;
}

module.exports = {
  getStrategyForPublicKey,
  saveStrategy
};
