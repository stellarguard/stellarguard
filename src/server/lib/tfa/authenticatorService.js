const { authenticatorOtp } = require('../utils');
const {
  AuthenticatorVerificationError,
  AuthenticatorNotActiveError
} = require('errors/authenticator');
const authenticatorRepository = require('./authenticatorRepository');
const userRepository = require('../users/userRepository');

class AuthenticatorService {
  async generateSecret(user) {
    return await authenticatorOtp.generateSecret(user.email);
  }

  async enableAuthenticator(user, { secret, verificationCode }) {
    if (!authenticatorOtp.verifyToken(verificationCode, secret)) {
      throw new AuthenticatorVerificationError();
    }

    return await authenticatorRepository.enableAuthenticator(user, { secret });
  }

  async removeAuthenticator(user, { verificationCode }) {
    const authenticator = await this.getForUser(user);

    if (!authenticator) {
      throw new AuthenticatorNotActiveError();
    }

    if (!authenticatorOtp.verifyToken(verificationCode, authenticator.secret)) {
      throw new AuthenticatorVerificationError();
    }

    if (user.transactionSecurityLevel === 'authenticator') {
      await userRepository.setTransactionSecurityLevel({
        id: user.id,
        transactionSecurityLevel: user.isEmailVerified ? 'email' : 'none'
      });
    }

    return await authenticatorRepository.removeAuthenticator(user);
  }

  async getForUser(user) {
    return await authenticatorRepository.getForUser(user);
  }

  verifyForUser(user, code) {
    return authenticatorOtp.verifyToken(code, user.authenticator.secret);
  }
}

module.exports = new AuthenticatorService();
