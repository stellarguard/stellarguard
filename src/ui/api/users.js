import axios from './axios';
import User from '../models/User';

export async function me() {
  const user = await axios.get('/users/me');
  return User.fromJson(user);
}

export async function register({ username, password, email }) {
  const user = await axios.post('/users', { username, password, email });
  return User.fromJson(user);
}
