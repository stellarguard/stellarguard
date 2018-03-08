const passwordValidator = require('./passwordValidator');
const users = require('validators/users');

exports.validate = async function(user) {
  await users.validate(user);
  await passwordValidator.validate(user.password);
};
