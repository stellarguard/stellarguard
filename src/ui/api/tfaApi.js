import axios from './axios';

export async function generateAuthenticatorSecret() {
  return await axios.post('/tfa/authenticator/secret');
}

export async function enableAuthenticator({ secret, verificationCode }) {
  return await axios.post('/tfa/authenticator', {
    secret,
    verificationCode
  });
}
