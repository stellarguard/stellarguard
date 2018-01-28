const express = require('express');
const router = express.Router();

const { users } = require('../../lib');

router.post('/', async function(req, res, next) {
  const { username, email, password } = req.body;
  const user = await users.userService.createUser({
    username,
    email,
    password
  });
  req.login(user, function(err) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
});

module.exports = router;
