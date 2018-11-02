import axios from './axios';
import Account from '../models/Account';

export async function createAccount({ publicKey }) {
  const account = await axios.post(`/accounts/${publicKey}`);
  return Account.fromJson(account);
}

export async function updateAccount({ publicKey, name }) {
  const account = await axios.put(`/accounts/${publicKey}`, { name });
  return Account.fromJson(account);
}
