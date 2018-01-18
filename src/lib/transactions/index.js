const stellar = require('../stellar');
const Transaction = require('./Transaction');
const transactionsRepository = require('./transactionsRepository');

async function getTransaction(id) {
  const transactionDto = await transactionsRepository.getTransaction(id);
  if (!transactionDto) {
    return;
  }

  return new Transaction({ id: transactionDto.id, xdr: transactionDto.xdr });
}

async function createTransaction(transaction) {
  const { sourceAccount, xdr } = transaction;
  const transactionDto = await transactionsRepository.createTransaction({
    sourceAccount,
    xdr
  });

  return new Transaction({ id: transactionDto.id, xdr: transactionDto.xdr });
}

async function submitTransaction(transaction) {
  return await stellar.transactions.submitTransaction(
    transaction.stellarTransaction
  );
}

module.exports = {
  Transaction,
  getTransaction,
  createTransaction,
  submitTransaction
};
