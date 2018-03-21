const transactionsRepository = require('./transactionsRepository');
const transactionsValidator = require('./transactionsValidator');
const stellar = require('../stellar');
const Transaction = require('./Transaction');
const { accountsService } = require('../accounts');
const { emailService } = require('../email');
const { authenticatorService } = require('../tfa');

const {
  TransactionNotFoundError,
  TransactionNotOwnedByUserError,
  InvalidAuthorizationCodeError,
  TransactionAlreadySubmittedError
} = require('errors/transaction');

class TransactionService {
  async getTransaction(id) {
    return await transactionsRepository.getTransaction(id);
  }

  async getForUser(user) {
    return await transactionsRepository.getTransactionsForUserId(user.id, {
      status: Transaction.Status.Pending
    });
  }

  async createTransaction(transaction, user) {
    transaction.userId = user && user.id;
    await transactionsValidator.validate(transaction);
    const newTransaction = await transactionsRepository.createTransaction(
      transaction
    );

    user.authenticator = await authenticatorService.getForUser(user);
    await emailService.sendTransactionAuthorizationEmail({
      user,
      transaction: newTransaction
    });

    return newTransaction;
  }

  async authorizeTransaction({ transaction, user, code }) {
    // TODO - expiration
    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    if (transaction.userId != user.id) {
      throw new TransactionNotOwnedByUserError();
    }

    if (transaction.status !== Transaction.Status.Pending) {
      throw new TransactionAlreadySubmittedError();
    }

    const isVerified = await this.verify({ transaction, user, code });
    if (!isVerified) {
      throw new InvalidAuthorizationCodeError();
    }

    transaction.sign(user.signerSecretKey);

    try {
      const result = await stellar.transactions.submitTransaction(
        transaction.stellarTransaction
      );

      if (transaction.isDeactivateAccountTransaction) {
        await accountsService.deactivateAccount({
          userId: transaction.userId,
          publicKey: transaction.source
        });
      }

      return await transactionsRepository.updateStatus(transaction, {
        status: Transaction.Status.Success,
        result
      });
    } catch (e) {
      if (e.data) {
        return await transactionsRepository.updateStatus(transaction, {
          status: Transaction.Status.Error,
          result: JSON.stringify(e.data)
        });
      }
    }
  }

  async denyTransaction({ transaction, user }) {
    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    if (transaction.userId != user.id) {
      throw new TransactionNotOwnedByUserError();
    }

    if (transaction.status !== Transaction.Status.Pending) {
      throw new TransactionAlreadySubmittedError();
    }

    return await transactionsRepository.updateStatus(transaction, {
      status: Transaction.Status.Denied
    });
  }

  async verify({ transaction, user, code }) {
    user.authenticator = await authenticatorService.getForUser(user);
    const type = user.transactionVerificationType;
    switch (type) {
      case 'none':
        return true;
      case 'email':
        return transaction.verifyAuthorizationCode(code);
      case 'authenticator':
        return authenticatorService.verifyForUser(user, code);
    }
  }
}

module.exports = new TransactionService();
