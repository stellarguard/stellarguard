const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const config = require('./config');
const PgSession = require('connect-pg-simple')(session);

const { users, db } = require('./lib');
const { InvalidCredentialsError } = require('errors/session');

function configure(app) {
  app.use(
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

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async function(
      email,
      password,
      done
    ) {
      const user = await users.userService.getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }
      if (!await user.verifyPassword(password)) {
        return done(null, false);
      }

      done(null, user);
    })
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(async function(id, cb) {
    const user = await users.userService.getUserById(id);
    cb(null, user);
  });
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
      if (err || !user) {
        return reject(new InvalidCredentialsError());
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
