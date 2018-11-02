const express = require('express');
const cors = require('cors');
const { parseStellarUri } = require('@stellarguard/stellar-uri');

const session = require('../../session');
const { transactions, users } = require('../../lib');

const {
  BootstrapMultisigTransactionResponse,
  TransactionStatusResponse
} = require('./responses');
const Controller = require('../Controller');

class TransactionsController extends Controller {
  async createTransaction(req, res) {
    let { xdr, callback, uri } = req.body;
    let isBootstrapRequest = false;
    if (uri) {
      // allow SEP7 uri as an alternative format
      const stellarUri = parseStellarUri(uri);
      xdr = stellarUri.xdr;
      callback = stellarUri.callback;
      isBootstrapRequest = true; // requires a different response format
    }

    const ipAddress = req.ip;
    const transaction = new transactions.Transaction({
      xdr: xdr,
      ipAddress,
      callback
    });

    const user = await users.userService.getFirstUserByAccountPublicKey(
      transaction.getSources()
    );

    const newTransaction = await transactions.transactionService.createTransaction(
      {
        transaction,
        user
      }
    );

    if (isBootstrapRequest) {
      return res.json(
        new BootstrapMultisigTransactionResponse({
          transaction: newTransaction
        })
      );
    } else {
      return res.json(newTransaction);
    }
  }

  async getTransaction(req, res, next) {
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
  }

  /**
   * Public API that returns the status of a transaction.
   */
  async getTransactionStatus(req, res) {
    const { id } = req.params;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    if (!transaction) {
      return res.status(404).json({
        error: 'Transaction not found.'
      });
    }

    const response = new TransactionStatusResponse({ transaction });
    return res.json(await response.toJSON());
  }

  async getTransactions(req, res) {
    const trans = await transactions.transactionService.getForUser(req.user);
    return res.json({ transactions: trans });
  }

  async authorizeTransaction(req, res, next) {
    const { id } = req.params;
    const { code } = req.body;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    const result = await transactions.transactionService.authorizeTransaction({
      transaction,
      user: req.user,
      code
    });

    res.json(result);
  }

  async denyTransaction(req, res) {
    const { id } = req.params;
    const transaction = await transactions.transactionService.getTransaction(
      id
    );

    const result = await transactions.transactionService.denyTransaction({
      user: req.user,
      transaction
    });

    res.json(result);
  }
}

const router = express.Router();
const controller = new TransactionsController();
// open route, no csrf or login required
router.options('/', cors());
router.post('/', cors(), controller.createTransaction);
router.get('/:id/status', cors(), controller.getTransactionStatus);

// logged in routes
router.use(session.csrf);
router.use(session.ensureLoggedIn());
router.get('/:id', controller.getTransaction);
router.get('/', controller.getTransactions);

// scenarios to test
// public key matches to no accounts
// current user does not have any accounts with source public key
router.post('/:id/authorize', controller.authorizeTransaction);
router.post('/:id/deny', controller.denyTransaction);

module.exports = router;
