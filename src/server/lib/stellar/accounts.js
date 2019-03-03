const StellarSdk = require('stellar-sdk');
const config = require('../../config');
const server = require('./server').server();

async function getPayments(publicKey, { cursor, limit }) {
  return await server
    .payments()
    .forAccount(publicKey)
    .cursor(cursor)
    .limit(limit)
    .call();
}

async function getOperations(publicKey) {
  return await server
    .operations()
    .forAccount(publicKey)
    .call();
}

async function getEffects(publicKey) {
  return await server
    .effects()
    .forAccount(publicKey)
    .call();
}

async function getAccount(publicKey) {
  return await server
    .accounts()
    .accountId(publicKey)
    .call();
}

async function getAccounts(publicKeys = []) {
  return await Promise.all(publicKeys.map(publicKey => getAccount(publicKey)));
}

function watchForPayments(publicKey, { onPayment, cursor }) {
  const paymentsCallBuilder = server.payments().forAccount(publicKey);

  if (cursor) {
    paymentsCallBuilder.cursor(cursor);
  }

  return paymentsCallBuilder.stream({
    onmessage: async record => {
      const transaction = await record.transaction();
      if (record.type !== 'payment') {
        return;
      }

      if (record.to !== publicKey) {
        return;
      }

      if (record.asset_type != 'native') {
        return;
      }

      onPayment({
        memo: transaction.memo,
        amount: record.amount,
        createdAt: new Date(record.created_at),
        asset: record.asset_type,
        cursor: record.paging_token,
        to: record.to,
        from: record.from,
        hash: record.transaction_hash,
        type: 'deposit'
      });
    }
  });
}

// returns a list of signers that could potentially be StellarGuard signers.\
function getPossibleStellarGuardSigners(account) {
  if (!doesAccountHaveSigner(account, config.stellarGuardPublicKey)) {
    return [];
  }

  return account.signers.filter(
    signer =>
      signer.key !== account.id && signer.key != config.stellarGuardPublicKey
  );
}

function hasStellarGuardMultisigSetup(account, targetSignerPublicKey) {
  return (
    doesAccountHaveSigner(account, targetSignerPublicKey) &&
    doesAccountHaveSigner(account, config.stellarGuardPublicKey)
  );
}

function doesAccountHaveSigner(account, requiredSigner) {
  return account.signers.some(signer => signer.key === requiredSigner);
}

function getSignerCreatedRecord(records, publicKey) {
  return records.filter(
    r => r.type === 'signer_created' && r.public_key === publicKey
  )[0];
}

module.exports = {
  getAccount,
  getAccounts,
  getEffects,
  getOperations,
  watchForPayments,
  hasStellarGuardMultisigSetup,
  getPossibleStellarGuardSigners
};
