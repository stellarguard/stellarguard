import axios from './axios';
import Account from '../models/Account';

export async function createAccount({ publicKey }) {
  const account = await axios.post('/accounts', { publicKey });
  return Account.fromJson(account);
}
