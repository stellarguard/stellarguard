const express = require('express');
const router = express.Router();

const { users } = require('../lib');
const session = require('../session');
const Controller = require('./Controller');
const { RequiredParamError } = require('errors/common');

class UserController extends Controller {
  async createUser(req, res, next) {
    const { email, password } = req.body;
    const user = await users.userService.createUser({
      email,
      password
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

  async getMultisigSetup(req, res) {
    const { externalId } = req.params;
    const { publicKey, backupSignerPublicKey } = req.query;

    if (!externalId) {
      throw new RequiredParamError({ name: 'externalId' });
    }

    if (!publicKey) {
      throw new RequiredParamError({ name: 'publicKey' });
    }

    const multiSigSetup = await users.userService.getMultisigSetup({
      externalId,
      publicKey,
      backupSigner: backupSignerPublicKey
    });

    return res.json(multiSigSetup);
  }
}

const controller = new UserController();

// fully exposed routes
router.get('/:externalId/multisig', controller.getMultisigSetup);

router.use(session.csrf);
// logged out routes
router.post('/', controller.createUser);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

// logged in routes
router.use(session.ensureLoggedIn());
router.get('/me', controller.getCurrentUser);
router.post('/me/resendverifyemail', controller.resendVerifyEmailAddressEmail);
router.post('/me/verifyemail', controller.verifyEmailAddress);

module.exports = router;
