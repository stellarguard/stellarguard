const express = require('express');
const router = express.Router();

const session = require('../session');

router.post('/', session.authenticateLocal(), function(req, res) {
  res.json(req.user);
});

router.delete('/', session.ensureLoggedIn(), function(req, res) {
  req.logout();
  res.json({});
});

module.exports = router;
