const dumbPasswords = require('dumb-passwords');
const users = require('../../../shared/validators/users');

exports.validate = async function(user) {
  await users.validate(user);
  if (dumbPasswords.check(user.password)) {
    throw {
      password: 'Your password is a common password, please use another.'
    };
  }
};
