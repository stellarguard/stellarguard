const express = require('express');
const router = express.Router();

const { accounts, stellar, users } = require('../lib');
const { MultiSigNotActiveError } = require('errors/account');
const { RequiredParamError } = require('errors/common');
const { NoUserForAccountPublicKeyError } = require('errors/user');
const Controller = require('./Controller');

const cors = require('cors');

class AccountsController extends Controller {
  async createAccount(req, res) {
    const { publicKey } = req.params;

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
      const user = await users.userService.getUserBySignerPublicKey(signer.key);

      if (user) {
        return user;
      }
    }
  }

  async getMultisigSetup(req, res) {
    const { publicKey } = req.params;
    const { stellarGuardPublicKey, backupSignerPublicKey } = req.query;

    const examplePublicKey =
      'GAGFWJVTYUEPG7EQCUET5CI2AAATOLLYLXUWIHF6JRD2SQXN3EJGVNGL';
    const exampleStellarGuardPublicKey =
      'GBRHFF3JCFNKFFKUINLUNADMBH6BC4E7JYS757Y6OZAT5PY5ZIBFA3UQ';
    const example = `/api/accounts/${examplePublicKey}?stellarGuardPublicKey=${exampleStellarGuardPublicKey}`;
    if (!publicKey) {
      throw new RequiredParamError({ name: 'publicKey', example });
    }

    if (!stellarGuardPublicKey) {
      throw new RequiredParamError({ name: 'stellarGuardPublicKey', example });
    }

    const multiSigSetup = await users.userService.getMultisigSetup({
      publicKey,
      stellarGuardPublicKey,
      backupSignerPublicKey
    });

    return res.json(multiSigSetup);
  }

  async getAccount(req, res) {
    const { publicKey } = req.params;
    const user = await users.userService.getUserByAccountPublicKey(publicKey);
    if (!user) {
      throw new NoUserForAccountPublicKeyError();
    }

    return res.json({
      userId: user.id,
      publicKey: publicKey,
      stellarGuardSignerPublicKey: user.signerPublicKey
    });
  }

  async editAccount(req, res) {
    const { publicKey } = req.params;
    const { name } = req.body;
    const account = await accounts.accountsService.getAccountByPublicKey(
      publicKey
    );

    if (!account) {
      throw new NoUserForAccountPublicKeyError();
    }

    account.name = name;

    const updatedAccount = await accounts.accountsService.updateAccount({
      account,
      user: req.user
    });

    return res.json(updatedAccount);
  }
}

const accountsController = new AccountsController();

// public api
router.options('/:publicKey', cors());
router.post('/:publicKey', cors(), accountsController.createAccount);
router.get('/:publicKey', cors(), accountsController.getAccount);
router.get('/:publicKey/multisig', cors(), accountsController.getMultisigSetup);

// private api
router.put('/:publicKey', accountsController.editAccount);

module.exports = router;
