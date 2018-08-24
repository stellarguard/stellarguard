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
    if (!constellationTransaction.isSignedBySourceAccount()) {
      return;
    }

    try {
      const transaction = new Transaction({
        xdr: constellationTransaction.xdr,
        externalId: constellationTransaction.id,
        submittedFrom: constellationTransaction.submittedFrom
      });

      const existingTransaction = await transactionService.getExternalTransaction(
        {
          externalId: transaction.externalId,
          submittedFrom: transaction.submittedFrom
        }
      );

      if (existingTransaction) {
        return;
      }

      const user = await userService.getFirstUserByAccountPublicKey(
        transaction.getSources()
      );

      if (!user) {
        return;
      }

      await transactionService.createTransaction({ transaction, user });
    } catch (e) {
      console.error('Error submitting Constellation Transaction', e);
    }
  }
}

module.exports = new ConstellationListener();
