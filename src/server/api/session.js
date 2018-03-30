const express = require('express');
const router = express.Router();

const session = require('../session');
const Controller = require('./Controller');
const {
  accounts: { accountsService },
  tfa: { authenticatorService },
  transactions: { transactionService }
} = require('../lib');

async function getFullUser(user) {
  const requests = [
    user.authenticator || authenticatorService.getForUser(user),
    user.accounts || accountsService.getForUser(user),
    user.transactions || transactionService.getForUser(user)
  ];

  const [authenticator, accounts, transactions] = await Promise.all(requests);
  user.authenticator = authenticator;
  user.accounts = accounts;
  user.transactions = transactions;
  return user;
}

class SessionController extends Controller {
  async signIn(req, res, next) {
    const user = await session.authenticateLocal(req, res, next);

    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }

      return res.json(await getFullUser(user));
    });
  }

  async getSession(req, res) {
    const user = req.user;
    if (user) {
      const fullUser = await getFullUser(user);
      return res.json({ user: fullUser });
    } else {
      return res.send({});
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
