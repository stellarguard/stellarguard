const stellar = require('../stellar');
const { crypto } = require('../utils');
class Transaction {
  static fromXdr(xdr) {
    return new Transaction({ xdr });
  }

  constructor({ id, userId, xdr, status = 'pending' }) {
    this.id = id;
    this.userId = userId;
    this.stellarTransaction = stellar.transactions.fromXdr(xdr);
    this.status = status;
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

  getAuthorizationCode() {
    return crypto.getHmac(this.id, 20);
  }

  /**
   * Returns true if the transaction has source accounts inside operations that differ from the transaction source
   */
  hasVariedSourceAccounts() {
    return this.stellarTransaction.operations.some(
      operation => !!operation.source && operation.source !== this.source
    );
  }

  verifyAuthorizationCode(code) {
    return this.getAuthorizationCode() === code;
  }

  sign(secretKey) {
    this.stellarTransaction = stellar.signer.signTransactionWithSecretKey(
      this.stellarTransaction,
      secretKey
    );
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      xdr: this.xdr
    };
  }
}

module.exports = Transaction;
