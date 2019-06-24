import { action, observable, computed, runInAction } from 'mobx';
import { transactionsApi } from '../api';

export default class TransactionsStore {
  @observable areTransactionsLoading = false;
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
    this.areTransactionsLoading = true;
    try {
      const transactions = await transactionsApi.getTransactions();
      transactions.forEach(transaction => this.addTransaction(transaction));
    } catch (e) {
      // TODO: Handle
    } finally {
      runInAction(() => {
        this.areTransactionsLoading = false;
      });
    }
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
  async authorize({ id }, { code } = {}) {
    const transaction = await transactionsApi.authorizeTransaction(id, {
      code
    });
    if (transaction.isDeactivateAccountTransaction) {
      this.rootStore.userStore.removeAccount({ publicKey: transaction.source });
    }
    this.rootStore.uiState.showSnackbar({
      message: `Transaction Authorized`,
      duration: 2500,
      variant: 'success'
    });
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  async deny({ id }) {
    const transaction = await transactionsApi.denyTransaction(id);
    this.rootStore.uiState.showSnackbar({
      message: `Transaction Denied`,
      duration: 2500,
      variant: 'error'
    });
    this.addTransaction(transaction);
    return transaction;
  }

  @action
  addTransaction(transaction) {
    this.transactions.set(transaction.id, transaction);
  }
}
