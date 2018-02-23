import axios from './axios';
import User from '../models/User';

export async function getSession() {
  const user = await axios.get('/session');
  if (user) {
    return User.fromJson(user);
  }
}

export async function signIn({ email, password }) {
  const user = await axios.post('/session', {
    email,
    password
  });

  return User.fromJson(user);
}

export async function signOut() {
  return await axios.delete('/session');
}
