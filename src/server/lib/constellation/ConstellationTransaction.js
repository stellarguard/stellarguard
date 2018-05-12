const stellar = require('../stellar');
const constellationApi = require('constellation-api');

class ConstellationTransaction {
  constructor({ xdr, network, progress }) {
    this.xdr = xdr;
    this.progress = progress;
    this.network = network;
    this.sourceAccount = this.toStellarTransaction().source;
  }

  isSignedBySourceAccount() {
    return !!this.progress[this.sourceAccount];
  }

  toStellarTransaction() {
    return stellar.transactions.fromXdr(this.xdr);
  }

  get isTestNetwork() {
    return this.network === constellationApi.Network.testnet;
  }

  get isPublicNetwork() {
    return this.network === constellationApi.Network.live;
  }

  static fromJson(json) {
    const { txenv, network, progress } = json;
    return new ConstellationTransaction({
      xdr: txenv,
      progress,
      network
    });
  }
}

module.exports = ConstellationTransaction;
