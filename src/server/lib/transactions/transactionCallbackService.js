const axios = require('axios');

class TransactionCallbackService {
  constructor() {
    this.axiosClient = axios.create({});
  }

  async sendTransactionSuccessCallback({ transaction, result }) {
    try {
      await this.axiosClient.post(transaction.callback, {
        id: transaction.id,
        xdr: transaction.xdr,
        result
      });
    } catch (e) {
      console.error(
        `Error submitting transaction success callback to ${
          transaction.callback
        }`,
        e
      );
    }
  }
}

module.exports = {
  TransactionCallbackService,
  transactionCallbackService: new TransactionCallbackService()
};
