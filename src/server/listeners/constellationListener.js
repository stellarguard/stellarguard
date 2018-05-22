const { constellationService } = require('../lib/constellation');
const { Transaction, transactionService } = require('../lib/transactions');
const { userService } = require('../lib/users');

class ConstellationListener {
  start() {
    this.stopListening = constellationService.listenForTransactions(
      this._onTransaction.bind(this)
    );
  }

  stop() {
    this.stopListening && this.stopListening();
    this.stopListening = null;
  }

  async _onTransaction(constellationTransaction) {
    console.log('Got transaction from Constellation API');
    if (!constellationTransaction.isSignedBySourceAccount()) {
      return;
    }

    try {
      const transaction = new Transaction({
        xdr: constellationTransaction.xdr,
        externalId: constellationTransaction.externalId,
        submittedFrom: 'constellation'
      });

      const user = await userService.getUserByAccountPublicKey(
        transaction.source
      );

      await transactionService.createTransaction(transaction, user);
    } catch (e) {
      console.error('Error submitting Constellation Transaction', e);
    }
  }
}

module.exports = new ConstellationListener();
