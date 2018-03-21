import { observable, computed } from 'mobx';
import StellarSdk from 'stellar-sdk'; // TODO -- lazy-load?

class Transaction {
  @observable id;
  @observable xdr;
  @observable userId;
  @observable status;
  @observable result;
  @observable isDeactivateAccountTransaction;

  constructor({
    id,
    xdr,
    userId,
    status,
    result,
    isDeactivateAccountTransaction
  }) {
    this.id = id;
    this.xdr = xdr;
    this.userId = userId;
    this.status = status;
    this.result = result;
    this.isDeactivateAccountTransaction = isDeactivateAccountTransaction;
  }

  @computed
  get stellarTransaction() {
    return new StellarSdk.Transaction(this.xdr);
  }

  @computed
  get operations() {
    return this.stellarTransaction.operations;
  }

  @computed
  get source() {
    return this.stellarTransaction.source;
  }

  @computed
  get memoText() {
    const memo = this.stellarTransaction.memo;
    return (memo && memo.type !== 'none' && memo.value) || '';
  }

  @computed
  get isPending() {
    console.log(this.status);
    return this.status === Transaction.Status.Pending;
  }

  @computed
  get isSuccessful() {
    return this.status === Transaction.Status.Success;
  }

  @computed
  get isExpired() {
    return this.status === Transaction.Status.Expired;
  }

  @computed
  get isDenied() {
    return this.status === Transaction.Status.Denied;
  }

  @computed
  get isError() {
    return this.status === Transaction.Status.Error;
  }

  @computed
  get resultJson() {
    let obj = this.result;
    if (!obj) {
      return;
    }

    if (typeof obj === 'string') {
      obj = JSON.parse(this.result);
    }

    return JSON.stringify(obj, null, 2);
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    return new Transaction(json);
  }

  static Status = {
    Pending: 1,
    Success: 2,
    Expired: 3,
    Denied: 4,
    Error: 5
  };
}

export default Transaction;
