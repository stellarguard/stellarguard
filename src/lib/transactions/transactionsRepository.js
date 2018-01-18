const transactions = {};
let ids = 0;

async function getTransaction(id) {
  return transactions[id];
}

async function createTransaction({ sourceAccount, xdr }) {
  const id = ++ids;
  const transaction = { xdr, sourceAccount, id };
  transactions[id] = transaction;
  return transaction;
}

module.exports = {
  getTransaction,
  createTransaction
};
