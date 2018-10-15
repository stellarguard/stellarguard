const constellationApi = require('constellation-api');
const config = require('../../config');
const ConstellationTransaction = require('./ConstellationTransaction');

class ConstellationService {
  constructor() {
    this.constellationServer = constellationApi.Server();
  }

  isTransactionToCurrentNetwork(constellationTransaction) {
    if (
      constellationTransaction.isTestNetwork &&
      config.useStellarTestNetwork
    ) {
      return true;
    }

    if (constellationTransaction.isPublicNetwork && config.isPublicNetwork) {
      return true;
    }

    return false;
  }

  listenForTransactions(onTransaction) {
    const eventSource = this.constellationServer.subscribe(
      config.stellarGuardPublicKey,
      payload => {
        const constellationTransaction = ConstellationTransaction.fromJson(
          payload
        );

        if (this.isTransactionToCurrentNetwork(constellationTransaction)) {
          onTransaction(constellationTransaction);
        }
      }
    );
    return () => {
      eventSource.close();
    };
  }

  async submitSignatures(transaction) {
    return await this.constellationServer.submitSignatures(
      transaction.hash,
      transaction.stellarTransaction.signatures
    );
  }
}

module.exports = new ConstellationService();
