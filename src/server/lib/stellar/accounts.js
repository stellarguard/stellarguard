const StellarSdk = require('stellar-sdk');

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
  return Promise.all(publicKeys.map(publicKey => getAccount(publicKey)));
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

async function getMultiSigSetup(publicKey, targetSignerPublicKey) {
  const account = await getAccount(publicKey);
  if (!doesAccountHaveSigner(account, targetSignerPublicKey)) {
    return;
  }

  let order = 'desc';
  let effects = await getEffects(publicKey, { order });
  while (effects.records.length) {
    const signerCreatedRecord = getSignerCreatedRecord(
      effects.records,
      targetSignerPublicKey
    );

    if (signerCreatedRecord) {
      const operation = await signerCreatedRecord.operation();
      const transaction = await operation.transaction();
      return {
        memo: transaction.memo
      };
    }

    effects = await effects.next();
  }
}

function doesAccountHaveSigner(account, requiredSigner) {
  return account.signers.some(signer => signer.public_key === requiredSigner);
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
  getMultiSigSetup
};
