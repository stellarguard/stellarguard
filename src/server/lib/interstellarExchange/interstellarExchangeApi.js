const axios = require('axios');
const Stomp = require('@stomp/stompjs');

const InterstellarExchangeTransaction = require('./interstellarExchangeTransaction');

class InterstellarExchangeApi {
  constructor(host) {
    this.axiosClient = axios.create({
      baseURL: `https://${host}/backend/api/v1`
    });
  }

  static testnet() {
    return new InterstellarExchangeApi('testnet.interstellar.exchange');
  }

  static publicnet() {
    return new InterstellarExchangeApi('interstellar.exchange');
  }

  async approveTransaction({ account, transactionId, signature }) {
    return await this.axiosClient.put('/transaction/approve', {
      action: 'approve',
      account,
      transactionId,
      signature
    });
  }

  async rejectTransaction({ account, transactionId, signature }) {
    return await this.axiosClient.put('/transaction/reject', {
      action: 'reject',
      account,
      transactionId,
      signature
    });
  }

  async getPendingTransactions({ account }) {
    const response = await this.axiosClient.get(
      `/pending_transactions/${account}`
    );
    return (response.data || []).map(json =>
      InterstellarExchangeTransaction.fromJson(json)
    );
  }
}

module.exports = InterstellarExchangeApi;
