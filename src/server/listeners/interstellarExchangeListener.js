const { interstellarExchangeService } = require('../lib/interstellarExchange');
const { Transaction, transactionService } = require('../lib/transactions');
const { userService } = require('../lib/users');
const { DuplicateTransactionError } = require('errors/transaction');

class InterstellarExchangeListener {
  start() {
    this.stopListening = interstellarExchangeService.listenForTransactions(
      this._onTransaction.bind(this)
    );
  }

  stop() {
    this.stopListening && this.stopListening();
    this.stopListening = null;
  }

  async _onTransaction(interstellarExchangeTransaction) {
    if (!interstellarExchangeTransaction.isReadyToSubmit()) {
      return;
    }

    const transaction = new Transaction({
      xdr: interstellarExchangeTransaction.xdr,
      externalId: interstellarExchangeTransaction.id,
      submittedFrom: interstellarExchangeTransaction.submittedFrom
    });

    // auto reject transactions that are rejected by source account
    // otherwise transactions may get "stuck" in InterStellar if they fail to submit
    if (interstellarExchangeTransaction.isRejectedBySourceAccount()) {
      return await this._rejectTransaction({ transaction });
    }

    // transactions not signed by source account are not ready to be submitted to StellarGuard
    if (interstellarExchangeTransaction.isSignedBySourceAccount()) {
      return await this._submitTransaction({ transaction });
    }
  }

  async _rejectTransaction({ transaction }) {
    try {
      let transactionToDeny = await transactionService.getExternalTransaction({
        externalId: transaction.externalId,
        submittedFrom: transaction.submittedFrom
      });

      const user = await userService.getUserByAccountPublicKey(
        transaction.source
      );

      if (!user) {
        return;
      }

      if (!transactionToDeny) {
        transactionToDeny = await transactionService.createTransaction({
          transaction,
          user,
          sendNotifications: false
        });
      }

      return await transactionService.denyTransaction({
        transaction: transactionToDeny,
        user
      });
    } catch (e) {
      console.error(
        'Error auto-rejecting InterStellar.Exchange Transaction',
        e
      );
    }
  }

  async _submitTransaction({ transaction }) {
    try {
      const existingTransaction = await transactionService.getExternalTransaction(
        {
          externalId: transaction.externalId,
          submittedFrom: transaction.submittedFrom
        }
      );

      if (existingTransaction) {
        return;
      }

      const user = await userService.getUserByAccountPublicKey(
        transaction.source
      );

      if (!user) {
        return;
      }
      return await transactionService.createTransaction({ transaction, user });
    } catch (e) {
      console.error('Error submitting InterStellar.Exchange Transaction', e);
    }
  }
}

module.exports = new InterstellarExchangeListener();
