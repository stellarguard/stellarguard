const User = require('./User');

const accountsRepository = require('../accounts/stellarAccountsRepository');

class UserRepository {
  constructor() {
    this.userDb = require('./userDb');
  }

  async createUser({ email, passwordHash, signerPublicKey, signerSecretKey }) {
    const user = {
      email,
      passwordHash,
      isEmailVerified: false,
      signerPublicKey,
      signerSecretKey
    };

    const newUser = await this.userDb.create(user);
    return new User(newUser);
  }

  async getUserById(id) {
    const data = await this.userDb.getById(id);
    if (data) {
      return new User(data);
    }
  }

  async getUserByEmail(email) {
    const data = await this.userDb.getByEmail(email);
    if (data) {
      return new User(data);
    }
  }

  async getUserByAccountPublicKey(publicKey) {
    const data = await this.userDb.getByAccountPublicKey(publicKey);
    if (data) {
      return new User(data);
    }
  }

  async getUserBySignerPublicKey(signerPublicKey) {
    const data = await this.userDb.getBySignerPublicKey(signerPublicKey);
    if (data) {
      return new User(data);
    }
  }

  async verifyEmail(user) {
    const isEmailVerified = true;
    await this.userDb.updateIsEmailVerified({
      id: user.id,
      isEmailVerified
    });
    user.isEmailVerified = isEmailVerified;
    return user;
  }
}

module.exports = new UserRepository();