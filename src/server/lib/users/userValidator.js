const passwordValidator = require('./passwordValidator');
const users = require('validators/users');
const recaptchaValidator = require('./recaptchaValidator');

exports.validate = async function(user) {
  await users.validate(user);
  await passwordValidator.validate(user.password);
  await recaptchaValidator.validateRegister(user);
};
