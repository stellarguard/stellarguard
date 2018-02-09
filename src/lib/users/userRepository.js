const User = require('./User');

const accountsRepository = require('../accounts/stellarAccountsRepository');

class UserRepository {
  constructor() {
    this.userDb = require('./userDb');
  }

  async createUser({ username, email, passwordHash }) {
    if (this.userDb.get(username, 'username')) {
      throw {
        username: 'This username is already taken.'
      };
    }

    const user = {
      username,
      email,
      passwordHash,
      verified: false
    };

    user.id = this.userDb.create(user);
    return new User(user);
  }

  async getUserById(id, { withTfaStrategies = false } = {}) {
    const data = this.userDb.get(id);
    if (data) {
      return new User(data);
    }
  }

  async getUserByUsername(username) {
    const data = this.userDb.get(username, 'username');
    if (data) {
      return new User(data);
    }
  }

  async getByAccountPublicKey(publicKey, options) {
    const stellarAccounts = await accountsRepository.findAccountsByPublicKey(
      publicKey
    );

    const activeAccounts = stellarAccounts.filter(
      account => account.isActive === true
    );

    if (!activeAccounts.length) {
      return;
    }

    const account = activeAccounts[0];
    return await this.getUserById(account.userId, options);
  }

  async verifyEmail(user) {
    const updatedUser = this.userDb.get(user.id);
    updatedUser.hasVerifiedEmail = true;
    this.userDb.update(updatedUser);
    return updatedUser;
  }
}

module.exports = new UserRepository();
