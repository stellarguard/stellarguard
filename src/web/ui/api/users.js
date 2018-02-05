import axios from './axios';

export async function me() {
  return await axios.get('/user/me');
}

export async function register({ username, password, email }) {
  return await axios.post('/users', { username, password, email });
}
