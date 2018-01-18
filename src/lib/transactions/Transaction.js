const stellar = require('../stellar');

class Transaction {
  constructor({ id, xdr }) {
    this.id = id;
    this.stellarTransaction = stellar.transactions.fromXdr(xdr);
  }

  get sourceAccount() {
    return this.stellarTransaction.source;
  }

  get xdr() {
    return stellar.transactions.toXdr(this.stellarTransaction);
  }

  sign(secretKey) {
    this.stellarTransaction = stellar.signer.signTransactionWithSecretKey(
      this.stellarTransaction,
      secretKey
    );
  }
}

module.exports = Transaction;
