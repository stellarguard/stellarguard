const express = require('express');
const router = express.Router();

const session = require('../session');

router.post('/', function(req, res, next) {
  session.authenticateLocal(function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.get('/', function(req, res) {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.send();
  }
});

router.delete('/', session.ensureLoggedIn(), function(req, res) {
  req.logout();
  res.json({});
});

module.exports = router;
