const config = require('./config');

var express = require('express');
const fs = require('fs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const version = require('../../package.json').version;
const session = require('./session');
const apiRoutes = require('./api');

const { UnknownError } = require('errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const UI_DIST = path.join(__dirname, '../../dist');

if (!config.isDevMode) {
  app.use(logger('combined'));
  app.use(
    '/dist',
    express.static(UI_DIST, {
      fallthrough: false,
      immutable: true,
      maxAge: '1y'
    })
  );
} else {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionSecret));

const sessionMiddleware = session.configure();
app.use('/api', sessionMiddleware, apiRoutes);
if (!config.isDevMode) {
  const indexHtml = fs.readFileSync(
    path.join(UI_DIST, version, 'index.html'),
    'utf8'
  );
  app.get('/*', function(req, res, next) {
    if (req.accepts('html')) {
      res.send(indexHtml.replace('%CSRF_TOKEN%', req.csrfToken()));
    } else {
      next();
    }
  });
}

if (config.isDevMode) {
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

module.exports = app;
