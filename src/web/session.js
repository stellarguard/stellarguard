const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const { users } = require('../lib');

function configure(app) {
  app.use(
    session({
      secret: 'keyboard cat',
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
    new LocalStrategy(async function(username, password, done) {
      const user = await users.getUserByUsername(username);
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
    const user = await users.getUserById(id);
    cb(null, user);
  });
}

module.exports = {
  configure
};
