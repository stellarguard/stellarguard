const bcrypt = require('bcrypt');
const userRepository = require('./userRepository');
const User = require('./User');
const passwords = require('./passwords');

async function createUser({ username, email, password }) {
  // TODO: validations
  const passwordHash = await passwords.hash(password);
  const userDto = await userRepository.createUser({
    username,
    email,
    passwordHash
  });
  return new User(userDto);
}

async function getUserById(id) {
  const userDto = await userRepository.getUserById(id);
  if (!userDto) {
    return;
  }

  return new User(userDto);
}

module.exports = {
  createUser,
  getUserById
};
