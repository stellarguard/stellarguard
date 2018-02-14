import { action, observable } from 'mobx';
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
  async submit({ xdr }) {
    const transaction = await transactionsApi.submitTransaction({ xdr });
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  async authorize(transaction, { code } = {}) {
    await transactionsApi.authorizeTransaction(transaction.id, { code });
    transaction.status = 'submitted';
  }

  @action
  addTransaction(transaction) {
    this.transactions.set(transaction.id, transaction);
  }
}
