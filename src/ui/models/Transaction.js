import { observable, computed } from 'mobx';
import StellarSdk from 'stellar-sdk'; // TODO -- lazy-load?

class Transaction {
  @observable
  id;
  @observable
  xdr;
  @observable
  status;
  @observable
  result;
  @observable
  isDeactivateAccountTransaction;
  @observable
  callback;

  constructor({
    id,
    xdr,
    status,
    result,
    isDeactivateAccountTransaction,
    callback
  }) {
    this.id = id;
    this.xdr = xdr;
    this.status = status;
    this.result = result;
    this.isDeactivateAccountTransaction = isDeactivateAccountTransaction;
    this.callback = callback;
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
    if (memo && memo.type !== 'none') {
      return memo.value.toString();
    }

    return '';
  }

  @computed
  get isPending() {
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
      return this.xdr;
    }

    if (typeof obj === 'string') {
      obj = JSON.parse(this.result);
    }

    return JSON.stringify(obj, null, 2);
  }

  @computed
  get callbackDomain() {
    if (!this.callback) {
      return;
    }

    return new URL(this.callback).hostname;
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
