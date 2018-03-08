const dumbPasswords = require('dumb-passwords');
const { CommonPasswordError } = require('errors/user');

exports.validate = function(password) {
  if (dumbPasswords.check(password)) {
    throw new CommonPasswordError();
  }
};
