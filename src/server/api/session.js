const express = require('express');
const router = express.Router();

const session = require('../session');
const Controller = require('./Controller');

class SessionController extends Controller {
  async signIn(req, res, next) {
    const user = await session.authenticateLocal(req, res, next);
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.json(user);
    });
  }

  async getSession(req, res) {
    if (req.user) {
      return res.json(req.user);
    } else {
      return res.send();
    }
  }

  async signOut(req, res) {
    session.logout(req);
    res.json({});
  }
}

const controller = new SessionController();

router.post('/', controller.signIn);
router.get('/', controller.getSession);
router.delete('/', session.ensureLoggedIn(), controller.signOut);

module.exports = router;
