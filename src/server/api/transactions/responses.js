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
      id: this.transaction.id,
      statusHref: urls.withHost(urls.transactionStatusApi({ transaction })),
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

  toJSON() {
    return {
      id: this.transaction.id,
      status: this.status,
      uri: this.transaction.uri.toString()
    };
  }
}

exports.BootstrapMultisigTransactionResponse = BootstrapMultisigTransactionResponse;
exports.TransactionStatusResponse = TransactionStatusResponse;
