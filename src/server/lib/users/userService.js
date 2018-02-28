const userRepository = require('./userRepository');
const { InvalidEmailVerificationCodeError } = require('errors/user');
const passwords = require('./passwords');

const { authenticatorService } = require('../tfa');
const { accountsService } = require('../accounts');
const stellar = require('../stellar');
const { emailService } = require('../email');
const userValidator = require('./userValidator');

class UserService {
  async createUser({ email, password }) {
    await userValidator.validate({ email, password });
    const passwordHash = await passwords.hash(password);
    const keyPair = stellar.keys.random();
    const user = await userRepository.createUser({
      email: email.toLowerCase(),
      passwordHash,
      signerPublicKey: keyPair.publicKey(),
      signerSecretKey: keyPair.secret()
    });

    emailService.sendWelcomeEmail({ user });

    return user;
  }

  async getUserById(id) {
    return await userRepository.getUserById(id);
  }

  async sendVerifyEmailAddressEmail(user) {
    await emailService.sendWelcomeEmail({ user });
  }

  async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email.toLowerCase());
  }

  async verifyEmail(user, code) {
    if (!user.verifyEmailCode(code)) {
      throw new InvalidEmailVerificationCodeError();
    }

    await userRepository.verifyEmail(user);
    return true;
  }

  async getFullUser(user) {
    const requests = [
      user.authenticator || authenticatorService.getForUser(user),
      user.accounts || accountsService.getForUser(user)
    ];

    const [authenticator, accounts] = await Promise.all(requests);
    user.authenticator = authenticator;
    user.accounts = accounts;
    return user;
  }

  /**
   * Gets the user that has an active accounts with the given public key.
   *
   * @param {string} publicKey The public key of the account to search by.
   */
  async getUserByAccountPublicKey(publicKey) {
    return await userRepository.getUserByAccountPublicKey(publicKey);
  }
}

module.exports = new UserService();
