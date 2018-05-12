const stellar = require('../stellar');

class InterstellarExchangeTransaction {
  constructor({ id, xdr, status, sourceAccount, signatures }) {
    this.id = id;
    this.xdr = xdr;
    this.status = status;
    this.sourceAccount = sourceAccount;
    this.signatures = signatures || [];
  }

  isSignedBySourceAccount() {
    return this.signatures.some(
      signature =>
        signature.account === this.sourceAccount && signature.status === 1
    );
  }

  toStellarTransaction() {
    return stellar.transactions.fromXdr(this.xdr);
  }

  static fromJson(json) {
    const { id, envelope, status, sourceAccount } = json.transaction;
    const signatures = json.signatures;
    return new InterstellarExchangeTransaction({
      id,
      xdr: envelope,
      status,
      sourceAccount,
      signatures
    });
  }
}

module.exports = InterstellarExchangeTransaction;
