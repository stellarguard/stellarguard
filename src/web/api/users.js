const express = require('express');
const passport = require('passport');
const router = express.Router();

const { users } = require('../../lib');

router.put('/', async function(req, res, next) {
  const { username, email, password } = req.body;
  const user = await users.createUser({ username, email, password });
  req.login(user, function(err) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
});

module.exports = router;
