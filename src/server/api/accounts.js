const express = require('express');
const router = express.Router();

const config = require('../config');

const session = require('../session');
const { accounts, stellar } = require('../lib');
const { MultiSigNotActiveError } = require('errors/account');
const Controller = require('./Controller');

class AccountsController extends Controller {
  async createAccount(req, res) {
    const { publicKey } = req.body;
    const user = req.user;
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

  async getMultiSigActivationTransaction(req, res) {
    const { id } = req.params;
    const { backup } = req.query;
    const account = await accounts.accountsService.getAccount(id);
    if (!account) {
      return res.status(404).json({
        error: 'The requested account does not exist.'
      });
    }

    if (account.userId !== req.user.id) {
      return res.status(403).json({
        error:
          'The requested account does not belong to the currently logged in user'
      });
    }

    const transaction = await accounts.accountsService.getMultiSigActivationTransaction(
      account,
      req.user,
      { backupSigner: backup }
    );

    res.json({ xdr: transaction.xdr });
  }
}

const accountsController = new AccountsController();

router.use(session.ensureLoggedIn());
router.post('/', accountsController.createAccount);

module.exports = router;
