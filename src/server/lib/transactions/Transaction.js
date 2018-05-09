const stellar = require('../stellar');
const { crypto } = require('../utils');
const config = require('../../config');
const { urls } = require('../utils');

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
    result,
    submittedFrom,
    externalId
  }) {
    this.id = id;
    this.userId = userId;
    this.stellarTransaction = stellar.transactions.fromXdr(xdr);
    this.status = status;
    this.dateCreated = dateCreated;
    this.result = result;
    this.ipAddress = ipAddress;
    this.submittedFrom = submittedFrom;
    this.externalId = externalId;
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
    return (
      this.isFromConstellation() ||
      this.isFromInterstellarExchange() ||
      (await stellar.transactions.hasValidSignatures(this.stellarTransaction))
    );
  }

  get hash() {
    return this.stellarTransaction.hash().toString('hex');
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

  isFromConstellation() {
    return this.submittedFrom === 'constellation';
  }

  isFromInterstellarExchange() {
    return this.submittedFrom === 'interstellar.exchange';
  }

  getSignatureForAccount(publicKey) {
    return stellar.signer.getSignatureForPublicKey(
      this.stellarTransaction,
      publicKey
    );
  }

  toJSON() {
    const json = {
      id: this.id,
      xdr: this.xdr,
      status: this.status,
      result: this.result,
      dateCreated: this.dateCreated,
      stellarGuard: true,
      url: urls.withHost(urls.authorizeTransaction({ transaction: this }))
    };

    const isDeactivateAccountTransaction = this.isDeactivateAccountTransaction;
    if (isDeactivateAccountTransaction) {
      json.isDeactivateAccountTransaction = isDeactivateAccountTransaction;
    }

    return json;
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
