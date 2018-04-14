const express = require('express');
const router = express.Router();

const session = require('../session');
const { accounts, stellar, users } = require('../lib');
const { MultiSigNotActiveError } = require('errors/account');
const { NoUserForEmailError } = require('errors/user');
const Controller = require('./Controller');

class AccountsController extends Controller {
  async createAccount(req, res) {
    const { publicKey } = req.params;
    const { email } = req.query;

    let user = req.user;
    if (!user && email) {
      user = await users.userService.getUserByEmail(email);
      if (!user) {
        throw new NoUserForEmailError();
      }
    }

    const multiSigSetup = await stellar.accounts.getMultiSigSetup(
      publicKey,
      user.signerPublicKey
    );

    if (!multiSigSetup) {
      throw new MultiSigNotActiveError(user.signerPublicKey);
    }

    const account = await accounts.accountsService.createAccount({
      publicKey,
      userId: user.id
    });
    res.json(account);
  }
}

const accountsController = new AccountsController();

// public api
router.post('/:publicKey?', accountsController.createAccount);

module.exports = router;
