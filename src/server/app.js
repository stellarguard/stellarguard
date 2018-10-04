const config = require('./config');

const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csp = require('express-csp-header');
const ms = require('ms');
const cors = require('cors');

const version = require('../../package.json').version;
const session = require('./session');
const apiRoutes = require('./api');

const { UnknownError } = require('errors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const UI_DIST = path.join(__dirname, '../../dist');
const UI_PUBLIC = path.join(__dirname, '../ui/public');

if (!config.isDevMode) {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.get('/robots.txt', (req, res) => {
  res.sendFile(UI_PUBLIC + '/robots.txt');
});

const getWellKnownEnvFolder = () => {
  if (config.isDevMode) {
    return 'dev';
  } else if (config.isTestNetwork) {
    return 'test';
  } else {
    return 'prod';
  }
};

app.use(
  '/.well-known',
  cors(),
  express.static(path.join(UI_PUBLIC, '.well-known', getWellKnownEnvFolder()), {
    maxAge: '1d',
    fallthrough: false,
    setHeaders: (res, path, stat) => {
      res.setHeader('content-type', 'text/plain; charset=utf-8');
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionSecret));
app.use(
  helmet({
    hsts: false // handled by cloudflare in production
  })
);
app.use(helmet.referrerPolicy());
app.use(
  csp({
    policies: {
      'default-src': [
        csp.SELF,
        csp.EVAL,
        '*.stellarguard.me',
        'stellar.org',
        '*.stellar.org',
        'google.com',
        '*.google.com',
        'gstatic.com',
        '*.gstatic.com'
      ].concat(config.isDevMode ? [csp.INLINE, 'ws://localhost:*'] : []),
      'style-src': [
        csp.SELF,
        csp.INLINE,
        '*.stellarguard.me',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ],
      'font-src': [
        csp.SELF,
        csp.INLINE,
        '*.stellarguard.me',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ],
      'base-uri': [csp.SELF],
      'img-src': ['*', 'data:'],
      'block-all-mixed-content': true
    }
  })
);

const sessionMiddleware = session.configure();
app.use('/api', sessionMiddleware, apiRoutes);
if (!config.isDevMode) {
  const indexHtml = fs.readFileSync(path.join(UI_DIST, 'index.html'), 'utf8');
  app.get('/*', session.csrf, function(req, res, next) {
    if (req.accepts('html')) {
      res.send(indexHtml.replace('%CSRF_TOKEN%', req.csrfToken()));
    } else {
      next();
    }
  });
}

if (config.isDevMode) {
  process.env.APP_VERSION = version;
  const Bundler = require('parcel-bundler');
  const bundler = new Bundler(path.resolve(__dirname, '../ui/index.html'));
  bundler.bundle();
  app.use(bundler.middleware());
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({ message: 'Not Found' });
  } else {
    console.error(err);
    res.status(500).json(new UnknownError());
  }
});

activateListeners();

function activateListeners() {
  const listeners = require('./listeners');
  listeners.start();
  // restart listeners every so often in case they have disconnected and did not recover
  setInterval(() => listeners.restart(), ms('30m'));
}

module.exports = app;
