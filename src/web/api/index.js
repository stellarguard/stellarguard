const express = require('express');
const router = express.Router();

const transactions = require('./transactions');
const users = require('./users');

router.use('/transactions', transactions);
router.use('/users', users);

module.exports = router;
