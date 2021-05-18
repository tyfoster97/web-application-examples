var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var euroRouter = require('./routes/euro');
var historyRouter = require('./routes/history');
var popRouter = require('./routes/pop');
var poundRouter = require('./routes/pound');
var resetRouter = require('./routes/reset');
const { httpErr } = require('./utils/util');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/euro', euroRouter);
app.use('/history', historyRouter);
app.use('/pop', popRouter);
app.use('/pound', poundRouter);
app.use('/reset', resetRouter);


// error handler
app.use(function(req, res, next) {
  httpErr(404, req, res, next);
});

module.exports = app;
