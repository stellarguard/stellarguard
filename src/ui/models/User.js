import { observable, computed } from 'mobx';
import Authenticator from './Authenticator';
import Account from './Account';
import Transaction from './Transaction';

export default class User {
  @observable email;
  @observable isEmailVerified;
  @observable signerPublicKey;
  @observable authenticator;
  @observable accounts;
  @observable transactionVerificationType;
  @observable transactions;

  constructor({
    id,
    email,
    isEmailVerified = false,
    signerPublicKey,
    authenticator,
    accounts,
    transactionVerificationType,
    transactions = []
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.signerPublicKey = signerPublicKey;
    this.authenticator = authenticator;
    this.transactionVerificationType = transactionVerificationType;
    this.accounts = accounts;
    this.transactions = transactions;
  }

  @computed
  get hasAuthenticator() {
    return !!this.authenticator;
  }

  @computed
  get pendingTransactions() {
    return this.transactions.filter(transaction => transaction.isPending);
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    const authenticator = Authenticator.fromJson(json.authenticator);
    const accounts = Account.fromJson(json.accounts);
    const transactions = (json.transactions || []).map(Transaction.fromJson);
    return new User({ ...json, authenticator, accounts, transactions });
  }
}
