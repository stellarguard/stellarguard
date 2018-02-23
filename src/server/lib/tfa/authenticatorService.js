const otp = require('./otp');
const { AuthenticatorVerificationError } = require('errors');
const authenticatorRepository = require('./authenticatorRepository');

class AuthenticatorService {
  async generateSecret(user) {
    return await otp.generateSecret(user.email);
  }

  async enableAuthenticator(user, { secret, verificationCode }) {
    if (!otp.verifyToken(verificationCode, secret)) {
      throw new AuthenticatorVerificationError();
    }

    return authenticatorRepository.enableAuthenticator(user, { secret });
  }
}

module.exports = new AuthenticatorService();
