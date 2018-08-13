const { authenticatorService } = require('../tfa');
const { emailService } = require('../email');

const {
  EmailCodeRequiredError,
  InvalidEmailVerificationCodeError
} = require('errors/user');

const {
  AuthenticatorCodeRequiredError,
  AuthenticatorVerificationError,
  AuthenticatorNotActiveError
} = require('errors/authenticator');

exports.validate = async function({ user, transactionSecurityLevel, code }) {
  const validTypes = ['authenticator', 'email', 'none'];
  if (!validTypes.includes(transactionSecurityLevel)) {
    throw new Error(
      `Invalid transaction security level: ${transactionSecurityLevel}`
    );
  }

  // if the user already has associated stellar accounts we need additional verification before we allow them to change the setting
  if (user.accounts && user.accounts.length > 0) {
    const currentTransactionSecurityLevel = user.transactionSecurityLevel;
    if (currentTransactionSecurityLevel === 'authenticator') {
      if (!code) {
        throw new AuthenticatorCodeRequiredError();
      }

      if (!user.authenticator) {
        throw new AuthenticatorNotActiveError();
      }
      if (!authenticatorService.verifyForUser(user, code)) {
        throw new AuthenticatorVerificationError();
      }
    } else if (currentTransactionSecurityLevel === 'email') {
      if (!code) {
        emailService.sendChangeTransactionSecurityLevelEmail({
          user,
          currentTransactionSecurityLevel,
          transactionSecurityLevel
        });
        throw new EmailCodeRequiredError();
      }
      if (!user.verifyEmailCode(code)) {
        throw new InvalidEmailVerificationCodeError();
      }
    }
  }
};
