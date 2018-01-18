const express = require('express');
const router = express.Router();

const { users } = require('../../lib');

router.put('/', async function(req, res, next) {
  const { username, email, password } = req.body;
  const user = await users.createUser({ username, email, password });
  res.json(user);
});

module.exports = router;
