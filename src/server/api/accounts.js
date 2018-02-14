const express = require('express');
const router = express.Router();

const config = require('../config');

const session = require('../session');
const { accounts, stellar } = require('../lib');

class AccountsController {
  async createAccount(req, res) {
    const { publicKey } = req.body;
    const multiSigSetup = await stellar.accounts.getMultiSigSetup(
      publicKey,
      config.signerPublicKey
    );

    if (!multiSigSetup) {
      return res.status(400).json({
        error: 'Multi-sig has not been set up for the requested account.'
      });
    }

    if (!multiSigSetup.memo) {
      return res.status(400).json({
        error:
          'Multi-sig transaction did not contain a memo. Please resubmit with the provided memo text.'
      });
    }

    if (!req.user.verifyMemoText(multiSigSetup.memo)) {
      return res.status(400).json({
        error:
          'Multi-sig transaction contained a memo, but it is not associated with the current logged in account'
      });
    }

    const account = await accounts.accountsService.createAccount({
      publicKey,
      userId: req.user.id
    });
    res.json(account);
  }

  async activateAccount(req, res) {
    const { id } = req.params;
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

    const multiSigSetup = await stellar.accounts.getMultiSigSetup(
      account.publicKey,
      config.signerPublicKey
    );

    if (!multiSigSetup) {
      return res.status(400).json({
        error: 'Multi-sig has not been set up for the requested account'
      });
    }

    if (!multiSigSetup.memo) {
      return res.status(400).json({
        error:
          'Multi-sig transaction did not contain a memo. Please resubmit with the provided memo text.'
      });
    }

    // TODO -- don't rely on it being a number
    if (req.user.matchesMultiSigMemo(multiSigSetup.memo)) {
      return res.status(400).json({
        error:
          'Multi-sig transaction contained a memo, but it cannot be associated with the current logged in account'
      });
    }

    const activatedAccount = accounts.accountsService.activateAccount(account);
    res.json(activatedAccount);
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
router.post('/:id/activate', accountsController.activateAccount);
router.get(
  '/:id/multisig',
  accountsController.getMultiSigActivationTransaction
);

module.exports = router;
