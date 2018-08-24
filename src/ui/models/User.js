import { observable, computed } from 'mobx';
import Authenticator from './Authenticator';
import Account from './Account';
import Transaction from './Transaction';
import UserSettings from './UserSettings';

export default class User {
  @observable email;
  @observable isEmailVerified;
  @observable signerPublicKey;
  @observable authenticator;
  @observable accounts;
  @observable transactionSecurityLevel;
  @observable transactions;
  @observable externalId;
  @observable settings;

  constructor({
    id,
    email,
    isEmailVerified = false,
    signerPublicKey,
    authenticator,
    accounts,
    transactionSecurityLevel,
    transactions = [],
    settings = {},
    externalId
  }) {
    this.id = id;
    this.externalId = externalId;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.signerPublicKey = signerPublicKey;
    this.authenticator = authenticator;
    this.transactionSecurityLevel = transactionSecurityLevel;
    this.accounts = accounts;
    this.transactions = transactions;
    this.settings = settings;
  }

  @computed
  get hasAccounts() {
    return this.accounts && this.accounts.length;
  }

  @computed
  get hasAuthenticator() {
    return !!this.authenticator;
  }

  @computed
  get pendingTransactions() {
    return this.transactions.filter(transaction => transaction.isPending);
  }

  hasAccount(publicKey) {
    return (
      this.hasAccounts &&
      this.accounts.some(account => account.publicKey === publicKey)
    );
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    const authenticator = Authenticator.fromJson(json.authenticator);
    const accounts = Account.fromJson(json.accounts);
    const transactions = (json.transactions || []).map(Transaction.fromJson);
    const settings = UserSettings.fromJson(json.settings);
    return new User({
      ...json,
      authenticator,
      accounts,
      transactions,
      settings
    });
  }
}
