const Transaction = require('./Transaction');

class TransactionRepository {
  constructor() {
    this.transactionDb = require('./transactionDb');
  }

  async getTransaction(id) {
    const data = this.transactionDb.get(id);
    if (!data) {
      return;
    }

    return new Transaction(data);
  }

  async createTransaction({ userId, xdr }) {
    const id = await this.transactionDb.create({ userId, xdr });
    return new Transaction({ xdr, userId, id });
  }

  async getTransactionsForUserId(userId) {
    const transactions = await this.transactionDb.get(userId, 'userId');
    return transactions.map(transaction => new Transaction(transaction));
  }

  async submitted(transaction) {
    transaction.status = 'submitted';
    await this.transactionDb.update(transaction);
    return transaction;
  }
}

module.exports = new TransactionRepository();
