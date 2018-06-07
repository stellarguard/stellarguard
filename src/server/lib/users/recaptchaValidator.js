const recaptchaApi = require('../google/recaptcha');
const { RecaptchaRegisterError } = require('errors/user');

async function validateRegister({ recaptchaToken, ipAddress }) {
  const { success, score, action } = await recaptchaApi.verify({
    token: recaptchaToken,
    ipAddress
  });

  if (!success || action !== 'register' || score < 0.5) {
    throw new RecaptchaRegisterError();
  }
}

exports.validateRegister = validateRegister;
