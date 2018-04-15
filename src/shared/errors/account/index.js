const AppError = require('../AppError');

class DuplicatePublicKeyError extends AppError {
  constructor() {
    super({
      code: 6001,
      message: 'This public key is already active on a StellarGuard account.'
    });
  }
}

class MultiSigNotActiveError extends AppError {
  constructor(signerPublicKey) {
    let message;
    if (signerPublicKey) {
      `Multisig is not active for the specified account. Verify that you submitted it to the Stellar network with ${signerPublicKey} as an additional signer.`;
    } else {
      `Multisig is not active for the specified account. Verify that you submitted it to the Stellar network with the correct signers.`;
    }
    super({
      code: 6002,
      message
    });
  }
}

module.exports = {
  DuplicatePublicKeyError,
  MultiSigNotActiveError
};
