import axios from './axios';
import User from '../models/User';

export async function getSession() {
  const result = await axios.get('/session');
  if (result.data) {
    return User.fromJson(result.data);
  }
}

export async function signIn({ username, password }) {
  const result = await axios.post('/session', {
    username,
    password
  });

  return User.fromJson(result.data);
}

export async function signOut() {
  return await axios.delete('/session');
}
