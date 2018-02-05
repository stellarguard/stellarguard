import axios from './axios';

export async function signIn({ username, password }) {
  return await axios.post('/session', {
    username,
    password
  });
}
