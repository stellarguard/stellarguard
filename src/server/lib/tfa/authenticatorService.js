const { authenticatorOtp } = require('../utils');
const {
  AuthenticatorVerificationError,
  AuthenticatorNotActiveError
} = require('errors/authenticator');
const authenticatorRepository = require('./authenticatorRepository');
const userRepository = require('../users/userRepository');
const rateLimit = require('../rateLimit');

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

    const isValid = await this._verifyForUser(
      user,
      verificationCode,
      authenticator.secret
    );

    if (!isValid) {
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

  async verifyForUser(user, code) {
    return await this._verifyForUser(user, code, user.authenticator.secret);
  }

  async _verifyForUser(user, code, secret) {
    const userId = user.id;
    const singleCodeRateLimit = await rateLimit.authenticator.limitSingleCode(
      userId,
      code
    );

    if (singleCodeRateLimit.limited) {
      return false;
    }

    // we only actually only want to count the attempt against the rate limit if it's a failure
    // but we still want to reject the request if it currently is limited
    const attemptsRateLimit = await rateLimit.authenticator.peekFailedAttempts(
      userId
    );

    if (attemptsRateLimit.limited) {
      return false;
    }

    if (authenticatorOtp.verifyToken(code, secret)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new AuthenticatorService();
