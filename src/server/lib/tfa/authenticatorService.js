const otp = require('./otp');
const { AuthenticatorVerificationError } = require('errors/authenticator');
const authenticatorRepository = require('./authenticatorRepository');

class AuthenticatorService {
  async generateSecret(user) {
    return await otp.generateSecret(user.email);
  }

  async enableAuthenticator(user, { secret, verificationCode }) {
    if (!otp.verifyToken(verificationCode, secret)) {
      throw new AuthenticatorVerificationError();
    }

    return await authenticatorRepository.enableAuthenticator(user, { secret });
  }

  async getForUser(userId) {
    return await authenticatorRepository.getForUser(userId);
  }
}

module.exports = new AuthenticatorService();
