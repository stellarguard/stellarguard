const express = require('express');
const router = express.Router();

const session = require('../session');
const Controller = require('./Controller');
const { users } = require('../lib');

class SessionController extends Controller {
  async signIn(req, res, next) {
    const user = await session.authenticateLocal(req, res, next);

    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }

      return res.json(await users.userService.getFullUser(user));
    });
  }

  async getSession(req, res) {
    const user = req.user;
    const csrf = req.csrfToken();
    if (user) {
      const fullUser = await users.userService.getFullUser(user);
      return res.json({ user: fullUser, csrf });
    } else {
      return res.send({ csrf });
    }
  }

  async signOut(req, res) {
    await session.logout(req);
    res.json({});
  }
}

const controller = new SessionController();

router.use(session.csrf);
router.post('/', controller.signIn);
router.get('/', controller.getSession);
router.delete('/', session.ensureLoggedIn(), controller.signOut);

module.exports = router;
