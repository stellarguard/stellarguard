const Transaction = require('./Transaction');

class TransactionRepository {
  constructor() {
    this.transactionDb = require('./transactionDb');
  }

  async getTransaction(id) {
    const data = await this.transactionDb.getById(id);
    if (!data) {
      return;
    }

    return new Transaction(data);
  }

  async createTransaction({
    userId,
    xdr,
    ipAddress,
    hash,
    submittedFrom,
    externalId,
    callback = null
  }) {
    const transaction = await this.transactionDb.create({
      userId,
      xdr,
      hash,
      ipAddress,
      submittedFrom,
      externalId,
      callback
    });
    return new Transaction(transaction);
  }

  async getTransactionsForUserId(userId, { status }) {
    const transactions = await this.transactionDb.getByUserId(userId, {
      status
    });
    return transactions.map(transaction => new Transaction(transaction));
  }

  async updateStatus(transaction, { status, result }) {
    await this.transactionDb.updateStatus({
      id: transaction.id,
      status,
      result
    });
    transaction.status = status;
    transaction.result = result;
    return transaction;
  }

  async getExternalTransaction({ externalId, submittedFrom }) {
    const transaction = await this.transactionDb.getByExternalId({
      externalId,
      submittedFrom
    });

    if (transaction) {
      return new Transaction(transaction);
    }
  }
}

module.exports = new TransactionRepository();
