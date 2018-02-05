const express = require('express');
const router = express.Router();

const { users } = require('../../lib');
const session = require('../session');

router.post('/', async function(req, res, next) {
  try {
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
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get('/me', session.ensureLoggedIn(), async (req, res) => {
  res.json(req.user);
});

router.post('/me/verifyemail', session.ensureLoggedIn(), async function(
  req,
  res,
  next
) {
  const { code } = req.params;
  const isVerified = await users.userService.verifyEmail(req.user, code);
  if (!isVerified) {
    return res
      .status(400)
      .json({ error: 'Email verification code is invalid.' });
  }

  return res.json({});
});

module.exports = router;
