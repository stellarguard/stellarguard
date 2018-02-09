import axios from './axios';
import User from '../models/User';

export async function me() {
  const user = await axios.get('/users/me');
  return User.fromJson(user);
}

export async function resendVerifyEmailAddressEmail() {
  return await axios.post('/users/me/resendverifyemail');
}

export async function verifyEmailAddress({ code }) {
  return await axios.post('/users/me/verifyemail', { code });
}

export async function register({ username, password, email }) {
  const user = await axios.post('/users', { username, password, email });
  return User.fromJson(user);
}
