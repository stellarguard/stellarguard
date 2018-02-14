const express = require('express');
const router = express.Router();
const isEmpty = require('lodash.isempty');

const session = require('../session');
const config = require('../config');

const { stellar, accounts, tfa, transactions, users } = require('../lib');

class TransactionsController {
  async createTransaction(req, res, next) {
    try {
      const { xdr } = req.body;
      if (!xdr) {
        return res.json(500, { error: 'xdr is required' });
      }

      const transaction = new transactions.Transaction({ xdr });
      const source = transaction.source;
      const user = await users.userService.getByAccountPublicKey(source, {
        withTfaStrategies: true
      });

      if (!user) {
        return res.status(404).json({
          error:
            'There is no user associated with the transaction source account.'
        });
      }

      if (transaction.hasVariedSourceAccounts()) {
        return res.status(403).json({
          error:
            'StellarGuard currently does not support operations with a source account that differs from the transaction source account.'
        });
      }

      if (!await transaction.hasValidSignatures()) {
        return res.status(403).json({
          error:
            'The submitted transaction does not have valid signatures for the source account.'
        });
      }

      if (isEmpty(user.tfaStrategies)) {
        return res.status(404).json({
          error:
            'There are no active authorization methods associated with the source account.'
        });
      }

      const newTransaction = await transactions.transactionService.createTransaction(
        {
          userId: user.id,
          xdr
        }
      );

      user.tfaStrategies.forEach(strategy =>
        strategy.execute({ user, transaction: newTransaction })
      );
      return res.json({ id: newTransaction.id });
    } catch (e) {
      // TODO -- centralize this
      console.error(e);
      return res.status(500).json({ error: 'Unknown' });
    }
  }

  async getTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await transactions.transactionService.getTransaction(
        id
      );

      if (!transaction || transaction.userId !== req.user.id) {
        return res.status(404).json({
          error: 'Transaction not found or you are not authorized to view it.'
        });
      }

      return res.json(transaction);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Unknown' });
    }
  }

  async authorizeTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const { tfaType } = req.query;
      const { code } = req.body;
      const transaction = await transactions.transactionService.getTransaction(
        id
      );

      // TODO - expiration
      if (!transaction) {
        return res
          .status(404)
          .json({ error: 'Transaction not found or is expired.' });
      }

      const transactionUser = await users.userService.getUserById(
        transaction.userId,
        {
          withTfaStrategies: true
        }
      );

      if (!transactionUser) {
        return res
          .status(403)
          .json({ error: 'Transaction does not have any associated users.' });
      }

      // TODO - decide here whether we need this.. i think we probably do?
      if (transactionUser.userId != req.user.userId) {
        return res.status(403).json({
          error:
            'You are trying to authorize a transaction that is not tied to your account'
        });
      }

      const tfaStrategy = transactionUser.tfaStrategies.find(
        tfaStrategy => tfaStrategy.type === tfaType
      );

      if (!tfaStrategy) {
        return res.status(500).json({
          error: `There is no ${tfaType} authorization strategy for this user.`
        });
      }

      const isVerified = await tfaStrategy.verify({ transaction, code });
      if (!isVerified) {
        // TODO - increment tries
        return res
          .status(403)
          .json({ error: 'Your verification code is incorrect.' });
      }

      transaction.sign(config.signerSecretKey);

      const result = await transactions.transactionService.submitTransaction(
        transaction
      );
      res.json(result);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Unknown' });
    }
  }

  async denyTransaction(req, res, next) {
    res.json({});
  }
}

const controller = new TransactionsController();

router.post('/', controller.createTransaction);

// logged in routes
router.use(session.ensureLoggedIn());
router.get('/:id', controller.getTransaction);

// scenarios to test
// public key matches to no accounts
// current user does not have any accounts with source public key
router.post('/:id/authorize', controller.authorizeTransaction);
router.post('/:id/deny', controller.denyTransaction);

module.exports = router;
