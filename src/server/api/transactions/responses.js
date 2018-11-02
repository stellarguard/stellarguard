const { urls } = require('../../lib/utils');

/**
 * A response conforming to the vendor-agnostic bootstrapping requirements.
 */
class BootstrapMultisigTransactionResponse {
  constructor({ transaction }) {
    this.transaction = transaction;
  }

  toJSON() {
    const transaction = this.transaction;
    return {
      _links: {
        status: {
          href: urls.withHost(urls.transactionStatusApi({ transaction }))
        }
      },
      id: this.transaction.id,
      extras: {
        isStellarGuard: true,
        url: urls.withHost(urls.authorizeTransaction({ transaction }))
      }
    };
  }
}

class TransactionStatusResponse {
  constructor({ transaction }) {
    this.transaction = transaction;
  }

  get status() {
    switch (this.transaction.status) {
      case 1:
        return 'pending';
      case 2:
        return 'success';
      case 3:
      case 4:
      case 5:
      default:
        return 'failed';
    }
  }

  async toJSON() {
    return {
      id: this.transaction.id,
      status: this.status,
      signers: await this.transaction.getSigners()
    };
  }
}

exports.BootstrapMultisigTransactionResponse = BootstrapMultisigTransactionResponse;
exports.TransactionStatusResponse = TransactionStatusResponse;
