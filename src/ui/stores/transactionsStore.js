import { action, observable, computed } from 'mobx';
import { transactionsApi } from '../api';

export default class TransactionsStore {
  @observable transactions = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async getTransaction(id) {
    let transaction = this.transactions.get(id);
    if (transaction) {
      return transaction;
    }

    transaction = await transactionsApi.getTransaction(id);
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  async getTransactions() {
    const transactions = await transactionsApi.getTransactions();
    transactions.forEach(transaction => this.addTransaction(transaction));
  }

  @computed
  get pendingTransactions() {
    return this.transactions
      .values()
      .filter(transaction => transaction.isPending);
  }

  @action
  async submit({ xdr }) {
    const transaction = await transactionsApi.submitTransaction({ xdr });
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  async authorize({ id }, { code }) {
    const transaction = await transactionsApi.authorizeTransaction(id, {
      code
    });
    if (transaction.isDeactivateAccountTransaction) {
      this.rootStore.userStore.removeAccount({ publicKey: transaction.source });
    }
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  async deny({ id }) {
    const transaction = await transactionsApi.denyTransaction(id);
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  addTransaction(transaction) {
    this.transactions.set(transaction.id, transaction);
  }
}
