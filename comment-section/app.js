var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addRouter = require('./routes/add');
var deleteRouter = require('./routes/delete');
var resetRouter = require('./routes/reset');
var undoRouter = require('./routes/undo');
var viewRouter = require('./routes/view');
const { httpErr } = require('./util/util');

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
app.use('/add', addRouter);
app.use('/delete', deleteRouter);
app.use('/reset', resetRouter);
app.use('/undo', undoRouter);
app.use('/view', viewRouter);

// error handler
app.use(function(req, res, next) {
  httpErr(404, req, res, next);
});

module.exports = app;
