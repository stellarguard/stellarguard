const InterstellarExchangeApi = require('./interstellarExchangeApi');
const config = require('../../config');
const ms = require('ms');

const POLLING_INTERVAL_MS = ms('15s');

class InterstellarExchangeService {
  constructor() {
    this.interstellarExchangeApi = config.useStellarPublicNetwork
      ? InterstellarExchangeApi.publicnet()
      : InterstellarExchangeApi.testnet();
  }

  listenForTransactions(onTransaction) {
    this._getPendingTransactions(onTransaction);
    const intervalId = setInterval(() => {
      this._getPendingTransactions(onTransaction);
    }, POLLING_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }

  async _getPendingTransactions(onTransaction) {
    const transactions = await this.interstellarExchangeApi.getPendingTransactions(
      {
        account: config.stellarGuardPublicKey
      }
    );

    transactions.forEach(interstellarTransaction =>
      onTransaction(interstellarTransaction)
    );
  }

  async approveTransaction(transaction, signerPublicKey) {
    const signature = transaction.getSignatureForAccount(signerPublicKey);
    return await this.interstellarExchangeApi.approveTransaction({
      account: signerPublicKey,
      signature,
      transactionId: transaction.externalId
    });
  }

  async rejectTransaction(transaction, signerPublicKey) {
    const signature = transaction.getSignatureForAccount(signerPublicKey);
    return await this.interstellarExchangeApi.rejectTransaction({
      account: signerPublicKey,
      transactionId: transaction.externalId,
      signature
    });
  }
}

module.exports = new InterstellarExchangeService();
