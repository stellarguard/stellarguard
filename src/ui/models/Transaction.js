import { observable, computed } from 'mobx';
import StellarSdk from 'stellar-sdk'; // TODO -- lazy-load?

class Transaction {
  @observable id;
  @observable xdr;
  @observable userId;
  @observable status;

  constructor({ id, xdr, userId, status }) {
    this.id = id;
    this.xdr = xdr;
    this.userId = userId;
    this.status = status;
  }

  @computed
  get stellarTransaction() {
    return new StellarSdk.Transaction(this.xdr);
  }

  @computed
  get operations() {
    return this.stellarTransaction.operations;
  }

  static fromJson(json) {
    return new Transaction(json);
  }
}

export default Transaction;
