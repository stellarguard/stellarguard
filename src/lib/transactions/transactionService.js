class TransactionService {
  async getTransaction(id) {
    return await transactionsRepository.getTransaction(id);
  }

  async createTransaction({ userId, xdr }) {
    // TODO - validate -- what validations?
    return await transactionsRepository.createTransaction({
      userId,
      xdr
    });
  }

  async submitTransaction(transaction) {
    // TODO -- record result after it was sent
    return await stellar.transactions.submitTransaction(
      transaction.stellarTransaction
    );
  }
}

module.exports = new TransactionService();
