const stellar = require('../stellar');

class Transaction {
  static fromXdr(xdr) {
    return new Transaction({ xdr });
  }

  constructor({ id, xdr }) {
    this.id = id;
    this.stellarTransaction = stellar.transactions.fromXdr(xdr);
  }

  get source() {
    return this.stellarTransaction.source;
  }

  get xdr() {
    return stellar.transactions.toXdr(this.stellarTransaction);
  }

  async hasValidSignatures() {
    return await stellar.transactions.hasValidSignatures(
      this.stellarTransaction
    );
  }

  sign(secretKey) {
    this.stellarTransaction = stellar.signer.signTransactionWithSecretKey(
      this.stellarTransaction,
      secretKey
    );
  }
}

module.exports = Transaction;
