const recaptchaApi = require('../google/recaptcha');
const { RecaptchaRegisterError } = require('errors/user');
const config = require('../../config');

async function validateRegister({ recaptchaToken, ipAddress }) {
  return await validate({
    recaptchaToken,
    ipAddress,
    expectedAction: 'register'
  });
}

async function validateSignin({ recaptchaToken, ipAddress }) {
  return await validate({
    recaptchaToken,
    ipAddress,
    expectedAction: 'signin'
  });
}

async function validate({
  recaptchaToken,
  expectedAction,
  ipAddress,
  scoreThreshold = 0.5
}) {
  if (!config.isRecaptchaEnabled) {
    return;
  }

  const { success, score, action } = await recaptchaApi.verify({
    token: recaptchaToken,
    ipAddress
  });

  if (!success || action !== expectedAction || score < scoreThreshold) {
    console.error(
      'Recaptcha failed',
      success,
      expectedAction,
      action,
      score,
      scoreThreshold
    );
    throw new RecaptchaRegisterError();
  }
}

exports.validateRegister = validateRegister;
exports.validateSignin = validateSignin;
