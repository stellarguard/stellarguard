const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const config = require('./config');
const PgSession = require('connect-pg-simple')(session);
const ms = require('ms');

const cookie = {
  path: '/',
  httpOnly: true,
  secure: !config.isDevMode,
  sameSite: true,
  maxAge: ms('30d')
};
const csrfMiddleware = require('csurf')({ cookie });

const { users, db, tfa, rateLimit } = require('./lib');

const {
  InvalidCredentialsError,
  RequiresAuthenticatorError,
  InvalidAuthenticatorCodeError,
  RateLimitedError
} = require('errors/session');

function configure() {
  const router = new express.Router();
  router.use(
    session({
      store: new PgSession({
        pool: db.pg.pool,
        pruneSessionInterval: ms('5m')
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async function(req, email, password, done) {
        try {
          const { recaptchaToken } = req.body;
          const { limited, retryIn } = await isSigninRateLimited(req, email);
          if (limited) {
            return done(new RateLimitedError({ retryIn }));
          }

          await users.recaptchaValidator.validateSignin({
            recaptchaToken,
            ipAddress: req.ip
          });
          const user = await users.userService.getUserByEmail(email);
          if (!user) {
            return done(new InvalidCredentialsError());
          }

          if (!(await user.verifyPassword(password))) {
            return done(new InvalidCredentialsError());
          }

          user.authenticator = await tfa.authenticatorService.getForUser(user);
          if (user.authenticator) {
            const code = req.body.code;
            if (!code) {
              return done(new RequiresAuthenticatorError());
            }

            if (!tfa.authenticatorService.verifyForUser(user, code)) {
              return done(new InvalidAuthenticatorCodeError());
            }
          }

          done(null, user);
        } catch (e) {
          console.error('Error during sign in', e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(async function(id, cb) {
    const user = await users.userService.getUserById(id);
    cb(null, user);
  });

  return router;
}

function ensureLoggedIn(options) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        error: 'You must be logged in to perform this operation.'
      });
    }

    next();
  };
}

async function isSigninRateLimited(req, email) {
  const MAX_EMAIL_SIGN_INS_PER_MINUTE = 6;
  const emailRateLimit = rateLimit.limiter.limit({
    key: `signin/email/${email.trim().toLowerCase()}`,
    burst: MAX_EMAIL_SIGN_INS_PER_MINUTE,
    rate: MAX_EMAIL_SIGN_INS_PER_MINUTE,
    period: ms('1m'),
    cost: 1
  });

  // also throttle on by ip address to stop attacks against multiple users
  const MAX_IP_SIGN_INS_PER_MINUTE = 60;
  const ipRateLimit = rateLimit.limiter.limit({
    key: `signin/ip/${req.ip}`,
    burst: MAX_IP_SIGN_INS_PER_MINUTE,
    rate: MAX_IP_SIGN_INS_PER_MINUTE,
    period: ms('1m'),
    cost: 1
  });

  const [emailRateLimitResult, ipRateLimitResult] = await Promise.all([
    emailRateLimit,
    ipRateLimit
  ]);

  console.log(emailRateLimitResult);
  return {
    limited: emailRateLimitResult.limited || ipRateLimitResult.limited,
    retryIn: Math.max(emailRateLimitResult.retryIn, ipRateLimitResult.retryIn)
  };
}

function ensureLoggedOut(options) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(403).json({
        error:
          'You cannot already be logged in while performing this operation.'
      });
    }

    next();
  };
}

function authenticateLocal(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', function(err, user) {
      if (err) {
        return reject(err);
      }

      resolve(user);
    })(req, res, next);
  });
}

async function logout(req) {
  req.logout();
}

const csrf = config.isDevMode ? (req, res, next) => next() : csrfMiddleware;

module.exports = {
  configure,
  logout,
  authenticateLocal,
  ensureLoggedOut,
  ensureLoggedIn,
  csrf
};
