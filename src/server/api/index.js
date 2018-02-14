const express = require('express');
const router = express.Router();

const transactions = require('./transactionsController');
const users = require('./users');
const session = require('./session');
const tfa = require('./tfa');
const accounts = require('./accounts');

router.use('/transactions', transactions);
router.use('/users', users);
router.use('/session', session);
router.use('/tfa', tfa);
router.use('/accounts', accounts);

module.exports = router;
