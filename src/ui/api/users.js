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

export async function completeOnboardingStep(step) {
  return await axios.post('/users/me/onboarding', { step });
}

export async function register({ password, email, recaptchaToken }) {
  const user = await axios.post('/users', { password, email, recaptchaToken });
  return User.fromJson(user);
}

export async function forgotPassword({ email }) {
  return await axios.post('/users/forgot-password', { email });
}

export async function resetPassword({ code, password }) {
  return await axios.post('/users/reset-password', {
    code,
    password
  });
}

export async function setTransactionSecurityLevel({
  transactionSecurityLevel,
  code
}) {
  return await axios.post('/users/me/transaction-security-level', {
    transactionSecurityLevel,
    code
  });
}
