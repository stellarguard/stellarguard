import knownAccounts from './knownAccounts.json';

function isKnownAccount(publicKey) {
  return knownAccounts[publicKey];
}

export { isKnownAccount };
