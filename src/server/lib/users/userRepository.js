const User = require('./User');

class UserRepository {
  constructor() {
    this.userDb = require('./userDb');
  }

  async createUser({
    email,
    passwordHash,
    signerPublicKey,
    encryptedSignerSecretKey,
    encryptedRecoveryPhrase,
    transactionSecurityLevel = 'email'
  }) {
    const user = {
      email,
      passwordHash,
      isEmailVerified: false,
      signerPublicKey,
      encryptedSignerSecretKey,
      encryptedRecoveryPhrase,
      transactionSecurityLevel
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
    const data = await this.userDb.getByEmail(email.toLowerCase());
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

  async getUserByExternalId(externalId) {
    const data = await this.userDb.getByExternalId(externalId);
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

  async updatePassword({ id, passwordHash }) {
    return await this.userDb.updatePassword({
      id: id,
      passwordHash
    });
  }

  async updateSettings({ id, settings }) {
    return await this.userDb.updateSettings({ id, settings });
  }

  async setTransactionSecurityLevel({ id, transactionSecurityLevel }) {
    return await this.userDb.updateTransactionSecurityLevel({
      id,
      transactionSecurityLevel
    });
  }
}

module.exports = new UserRepository();
