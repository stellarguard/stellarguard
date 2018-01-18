const usernames = {};
const db = {};

let sequence = 0;

async function createUser({ username, email, passwordHash }) {
  if (usernames[username]) {
    throw {
      error: 'unique',
      field: 'username'
    };
  }

  const id = ++sequence;

  usernames[username] = id;
  const newUser = {
    id,
    username,
    email,
    passwordHash,
    verified: false
  };

  db[id] = newUser;
  return newUser;
}

async function getUserById(id) {
  return db[id];
}

async function getUserByUsername(username) {
  const id = usernames[username];
  if (!id) {
    return;
  }

  return db[id];
}

module.exports = {
  getUserById,
  getUserByUsername,
  createUser
};
