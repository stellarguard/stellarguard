const transactionsRepository = require('./transactionsRepository');
const transactionsValidator = require('./transactionsValidator');
const stellar = require('../stellar');
const Transaction = require('./Transaction');
const { userService } = require('../users');
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

  async createTransaction(transaction) {
    const source = transaction.source;
    const user = await userService.getUserByAccountPublicKey(source);
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

    const result = await stellar.transactions.submitTransaction(
      transaction.stellarTransaction
    );

    return await transactionsRepository.updateStatus(transaction, {
      status: Transaction.Status.Success,
      result
    });
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
