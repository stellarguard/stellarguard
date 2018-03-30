const constellationApi = require('constellation-api');
const config = require('../../config');
const { Transaction, transactionService } = require('../transactions');
const { userService } = require('../users');

class ConstellationService {
  constructor() {
    this.constellationServer = constellationApi.Server();
  }

  isTestNetworkTransaction(payload) {
    return payload.network === constellationApi.Network.testnet;
  }

  isPublicNetworkTransaction(payload) {
    return payload.network === constellationApi.Network.live;
  }

  isTransactionToCurrentNetwork(payload) {
    if (
      this.isTestNetworkTransaction(payload) &&
      !config.useStellarPublicNetwork
    ) {
      return true;
    }

    if (
      this.isPublicNetworkTransaction(payload) &&
      config.useStellarPublicNetwork
    ) {
      return true;
    }

    return false;
  }

  listenForTransactions() {
    this.constellationServer.subscribe(config.stellarGuardPublicKey, payload =>
      this._onTransaction(payload)
    );
  }

  async _onTransaction(payload) {
    console.log('Got transaction from Constellation API', payload);
    if (this.isTransactionToCurrentNetwork(payload)) {
      const xdr = payload.txenv;
      const transaction = new Transaction({
        xdr,
        submittedFrom: 'constellation'
      });
      const isSignedByTransactionSource = payload.progress[transaction.source];
      if (isSignedByTransactionSource) {
        try {
          const user = await userService.getUserByAccountPublicKey(
            transaction.source
          );
          await transactionService.createTransaction(transaction, user);
        } catch (e) {
          console.error('Error submitting Constellation Transaction', e);
        }
      }
    }
  }

  async submitSignatures(transaction) {
    return await this.constellationServer.submitSignatures(
      transaction.hash,
      transaction.stellarTransaction.signatures
    );
  }
}

module.exports = new ConstellationService();
