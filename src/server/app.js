const config = require('./config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const session = require('./session');

const apiRoutes = require('./api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const UI_DIST = path.join(__dirname, '../../dist');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
if (!config.isDevMode) {
  app.use('/dist', express.static(UI_DIST));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionSecret));

const sessionMiddleware = session.configure();
app.use('/api', sessionMiddleware, apiRoutes);
if (!config.isDevMode) {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(UI_DIST, 'index.html'));
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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
