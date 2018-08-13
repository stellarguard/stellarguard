const express = require('express');
const router = express.Router();

const {
  users,
  accounts: { accountsService },
  tfa: { authenticatorService }
} = require('../lib');
const session = require('../session');
const Controller = require('./Controller');

async function getFullUser(user) {
  const requests = [
    user.authenticator || authenticatorService.getForUser(user),
    user.accounts || accountsService.getForUser(user)
  ];

  const [authenticator, accounts] = await Promise.all(requests);
  user.authenticator = authenticator;
  user.accounts = accounts;
  return user;
}

class UserController extends Controller {
  async createUser(req, res, next) {
    const { email, password, recaptchaToken } = req.body;
    const user = await users.userService.createUser({
      email,
      password,
      recaptchaToken,
      ipAddress: req.ip
    });

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.json(user);
    });
  }

  async getCurrentUser(req, res) {
    res.json(req.user);
  }

  async resendVerifyEmailAddressEmail(req, res) {
    await users.userService.sendVerifyEmailAddressEmail(req.user);
    res.json({});
  }

  async verifyEmailAddress(req, res) {
    const { code } = req.body;
    await users.userService.verifyEmail(req.user, code);
    return res.json({});
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    await users.userService.forgotPassword({ email });
    return res.json({});
  }

  async resetPassword(req, res) {
    const { code, password } = req.body;
    await users.userService.resetPassword({ code, password });
    return res.json({});
  }

  async setOnboardingStepComplete(req, res) {
    const { step } = req.body;
    const user = req.user;
    user.settings.onboarding.completeStep(step);
    await users.userService.updateSettings(req.user);
    return res.json(req.user.settings.onboarding);
  }

  async setTransactionSecurityLevel(req, res) {
    const { transactionSecurityLevel, code } = req.body;
    const user = await getFullUser(req.user);
    await users.userService.setTransactionSecurityLevel(user, {
      transactionSecurityLevel,
      code
    });

    return res.json({});
  }

  async getRecoveryPhrase(req, res) {
    const result = await users.userService.getRecoveryPhrase(req.user);
    return res.json(result);
  }
}

const controller = new UserController();

router.use(session.csrf);

const loggedOutRoutes = express.Router();
router.use('/', loggedOutRoutes);
loggedOutRoutes.post('/', controller.createUser);
loggedOutRoutes.post('/forgot-password', controller.forgotPassword);
loggedOutRoutes.post('/reset-password', controller.resetPassword);

const meRoutes = express.Router();
router.use('/me', meRoutes);
meRoutes.use(session.ensureLoggedIn());
meRoutes.get('/', controller.getCurrentUser);
meRoutes.post('/resendverifyemail', controller.resendVerifyEmailAddressEmail);
meRoutes.post('/verifyemail', controller.verifyEmailAddress);
meRoutes.post('/onboarding', controller.setOnboardingStepComplete);
meRoutes.post(
  '/transaction-security-level',
  controller.setTransactionSecurityLevel
);
meRoutes.get('/recovery-phrase', controller.getRecoveryPhrase);

module.exports = router;
