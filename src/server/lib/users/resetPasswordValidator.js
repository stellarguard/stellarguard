const resetpassword = require('validators/resetPassword');
const passwordValidator = require('./passwordValidator');
const ms = require('ms');

const {
  InvalidPasswordResetCodeError,
  PasswordResetCodeExpiredError
} = require('errors/user');

exports.validate = async function({ code, password, payload }) {
  await resetpassword.validate({ code, password });
  await passwordValidator.validate(password);

  if (!payload) {
    throw new InvalidPasswordResetCodeError();
  }

  const { ts, userId } = payload;

  if (!userId || !ts) {
    throw new InvalidPasswordResetCodeError();
  }

  if (Date.now() - ts > ms('2h')) {
    throw new PasswordResetCodeExpiredError();
  }

  return true;
};
