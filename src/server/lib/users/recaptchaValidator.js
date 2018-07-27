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

  const { success, score, action } = await verify({
    token: recaptchaToken,
    ipAddress
  });

  if (!success || action !== expectedAction || score < scoreThreshold) {
    console.info(
      'Recaptcha failed',
      success,
      expectedAction,
      action,
      score,
      scoreThreshold
    );

    // TODO: enable this when we get a better sense for thresholds and quality of recapthca v3
    // throw new RecaptchaRegisterError();
  }
}

async function verify({ token, ipAddress }) {
  try {
    const { success, score, action } = await recaptchaApi.verify({
      token,
      ipAddress
    });

    return { success, score, action };
  } catch (e) {
    console.error('Error from recaptcha', e);
    return { success: false };
  }
}

exports.validateRegister = validateRegister;
exports.validateSignin = validateSignin;
