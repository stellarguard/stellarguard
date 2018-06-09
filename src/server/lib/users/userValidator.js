const passwordValidator = require('./passwordValidator');
const users = require('validators/users');
const recaptchaValidator = require('./recaptchaValidator');
const config = require('../../config');

exports.validate = async function(user) {
  await users.validate(user);
  await passwordValidator.validate(user.password);
  if (config.isRecaptchaEnabled) {
    await recaptchaValidator.validateRegister(user);
  }
};
