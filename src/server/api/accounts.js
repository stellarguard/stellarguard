const express = require('express');
const router = express.Router();

const { accounts, stellar, users } = require('../lib');
const { MultiSigNotActiveError } = require('errors/account');
const Controller = require('./Controller');

class AccountsController extends Controller {
  async createAccount(req, res) {
    const { publicKey } = req.body;

    let user = req.user;
    const stellarAccount = await stellar.accounts.getAccount(publicKey);
    if (!user) {
      user = await this._findUserFromAccountSigners(stellarAccount);
    }

    if (!user) {
      throw new MultiSigNotActiveError();
    }

    const hasMultiSigSetup = stellar.accounts.hasStellarGuardMultisigSetup(
      stellarAccount,
      user.signerPublicKey
    );

    if (!hasMultiSigSetup) {
      throw new MultiSigNotActiveError(user.signerPublicKey);
    }

    const account = await accounts.accountsService.createAccount({
      publicKey,
      userId: user.id
    });

    res.json(account);
  }

  async _findUserFromAccountSigners(stellarAccount) {
    const signers = stellar.accounts.getPossibleStellarGuardSigners(
      stellarAccount
    );

    // we need to try to find the StellarGuard user from the signer
    for (let signer of signers) {
      const user = await users.userService.getUserBySignerPublicKey(
        signer.public_key
      );

      if (user) {
        return user;
      }
    }
  }
}

const accountsController = new AccountsController();

// public api
router.post('/', accountsController.createAccount);

module.exports = router;
