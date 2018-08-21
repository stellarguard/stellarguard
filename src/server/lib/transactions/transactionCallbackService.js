const axios = require('axios');
const querystring = require('querystring');

class TransactionCallbackService {
  constructor() {
    this.axiosClient = axios.create({});
  }

  async sendTransactionSuccessCallback({ transaction }) {
    try {
      const data = {
        id: transaction.id,
        xdr: transaction.xdr
      };
      await axios.post(transaction.callback, querystring.stringify(data));
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
