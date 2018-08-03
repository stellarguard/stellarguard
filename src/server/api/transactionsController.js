const express = require('express');
const router = express.Router();

const session = require('../session');
const config = require('../config');
const cors = require('cors');

const { transactions, users } = require('../lib');
const Controller = require('./Controller');

class TransactionsController extends Controller {
  async createTransaction(req, res) {
    const { xdr, callback } = req.body;
    const ipAddress = req.ip;
    const transaction = new transactions.Transaction({
      xdr,
      ipAddress,
      callback
    });
    const user = await users.userService.getUserByAccountPublicKey(
      transaction.source
    );
    const newTransaction = await transactions.transactionService.createTransaction(
      {
        transaction,
        user
      }
    );

    return res.json(newTransaction);
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

const controller = new TransactionsController();
// open route, no csrf or login required
router.options('/', cors());
router.post('/', cors(), controller.createTransaction);

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
