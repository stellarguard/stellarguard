const stellar = require('../stellar');
const { crypto } = require('../utils');
const config = require('../../config');

class Transaction {
  static fromXdr(xdr) {
    return new Transaction({ xdr });
  }

  constructor({
    id,
    userId,
    xdr,
    status = Transaction.Status.Pending,
    dateCreated,
    ipAddress,
    result
  }) {
    this.id = id;
    this.userId = userId;
    this.stellarTransaction = stellar.transactions.fromXdr(xdr);
    this.status = status;
    this.dateCreated = dateCreated;
    this.result = result;
    this.ipAddress = ipAddress;
  }

  get source() {
    return this.stellarTransaction.source;
  }

  get xdr() {
    return stellar.transactions.toXdr(this.stellarTransaction);
  }

  get isDeactivateAccountTransaction() {
    return this.stellarTransaction.operations.some(
      operation =>
        operation.signer &&
        operation.signer.ed25519PublicKey === config.stellarGuardPublicKey &&
        operation.signer.weight === 0
    );
  }

  async hasValidSignatures() {
    return await stellar.transactions.hasValidSignatures(
      this.stellarTransaction
    );
  }

  getAuthorizationCode() {
    return crypto.getHmac(this.id);
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
      xdr: this.xdr,
      status: this.status,
      result: this.result,
      dateCreated: this.dateCreated,
      isDeactivateAccountTransaction: this.isDeactivateAccountTransaction
    };
  }
}

Transaction.Status = {
  Pending: 1,
  Success: 2,
  Expired: 3,
  Denied: 4,
  Error: 5
};

module.exports = Transaction;
