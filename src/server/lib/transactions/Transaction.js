const stellar = require('../stellar');
const { emailOtp } = require('../utils');
const config = require('../../config');
const { urls } = require('../utils');

const { TransactionStellarUri } = require('@stellarguard/stellar-uri');
const { getSigners } = require('@stellarguard/multisig-utils');

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
    externalId,
    callback
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
    this.callback = callback;
  }

  get source() {
    return this.stellarTransaction.source;
  }

  get xdr() {
    return stellar.transactions.toXdr(this.stellarTransaction);
  }

  get uri() {
    const uri = TransactionStellarUri.forTransaction(this.stellarTransaction);
    if (config.isTestNetwork) {
      uri.useTestNetwork();
    }
    return uri;
  }

  get isDeactivateAccountTransaction() {
    return this.stellarTransaction.operations.some(
      operation =>
        operation.signer &&
        operation.signer.ed25519PublicKey === config.stellarGuardPublicKey &&
        operation.signer.weight === 0
    );
  }

  hasValidSignatures(user) {
    return (
      this.isFromConstellation() ||
      this.isFromInterstellarExchange() ||
      this.isSignedByUserAccount(user)
    );
  }

  isSignedByUserAccount(user) {
    return user.accounts.some(account =>
      stellar.transactions.isSignedByAccount(
        this.stellarTransaction,
        account.publicKey
      )
    );
  }

  get hash() {
    return this.stellarTransaction.hash().toString('hex');
  }

  getEmailAuthorizationCode() {
    return emailOtp.generateToken(config.otpSecret, { suffix: this.id });
  }

  verifyEmailAuthorizationCode(code) {
    return emailOtp.verifyToken(code, config.otpSecret, { suffix: this.id });
  }

  /**
   * Gets all sources of the transaction as an array.
   */
  getSources() {
    const sources = new Set();
    sources.add(this.source);

    this.stellarTransaction.operations.forEach(operation => {
      if (operation.source) {
        sources.add(operation.source);
      }
    });

    return Array.from(sources);
  }

  async getSigners() {
    return await getSigners(this.stellarTransaction, stellar.server.server());
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
      url: urls.withHost(urls.authorizeTransaction({ transaction: this })),
      callback: this.callback
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
