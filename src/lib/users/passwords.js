const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hash(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function compare(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

module.exports = {
  hash,
  compare
};
