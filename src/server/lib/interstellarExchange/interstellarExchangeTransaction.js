const stellar = require('../stellar');

const SignatureStatus = {
  Signed: 1,
  Rejected: -1
};

class InterstellarExchangeTransaction {
  constructor({ id, xdr, status, sourceAccount, signatures }) {
    this.id = id;
    this.xdr = xdr;
    this.status = status;
    this.sourceAccount = sourceAccount;
    this.signatures = signatures || [];
    this.submittedFrom = 'interstellar.exchange';
  }

  isSignedBySourceAccount() {
    return this.hasStatusForSourceAccount(SignatureStatus.Signed);
  }

  isRejectedBySourceAccount() {
    return this.hasStatusForSourceAccount(SignatureStatus.Rejected);
  }

  isReadyToSubmit() {
    return this.isSignedBySourceAccount() || this.isRejectedBySourceAccount();
  }

  hasStatusForSourceAccount(status) {
    return this.signatures.some(
      signature =>
        signature.account === this.sourceAccount && signature.status === status
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
