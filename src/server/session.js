const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const config = require('./config');
const PgSession = require('connect-pg-simple')(session);

const { users, db, tfa } = require('./lib');
const {
  InvalidCredentialsError,
  RequiresAuthenticatorError,
  InvalidAuthenticatorCodeError
} = require('errors/session');

function configure() {
  const router = new express.Router();
  router.use(
    session({
      store: new PgSession({
        pool: db.pg.pool
      }),
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true
      }
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async function(req, email, password, done) {
        const user = await users.userService.getUserByEmail(email);
        if (!user) {
          return done(new InvalidCredentialsError());
        }

        if (!await user.verifyPassword(password)) {
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

module.exports = {
  configure,
  logout,
  authenticateLocal,
  ensureLoggedOut,
  ensureLoggedIn
};
