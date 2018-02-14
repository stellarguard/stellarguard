import axios from './axios';
import Transaction from '../models/Transaction';

export async function submitTransaction({ xdr }) {
  const transaction = await axios.post('/transactions', { xdr });
  return Transaction.fromJson(transaction);
}

export async function getTransaction(id) {
  const transaction = await axios.get(`/transactions/${id}`);
  return Transaction.fromJson(transaction);
}

export async function authorizeTransaction(id, { code }) {
  await axios.post(`/transactions/${id}/authorize`, { code });
}
