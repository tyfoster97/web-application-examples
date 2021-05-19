var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var matchRouter = require('./routes/match');
var questionRouter = require('./routes/question');
const { httpErr } = require('./util/util/util');
const { addQuestion } = require('./util/question/question.methods');
const { connect } = require('./util/util/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'AWAREAWAKEALIVE', //FIX no secrets in code
  resave: true,
  saveUninitialized: true
}));


async () => {
  await connect();
  await addQuestion('when do you go to sleep?', ['before midnight', 'after midnight']).catch(err => console.log(err));
}

app.use('/', indexRouter);
app.use('/match', matchRouter);
app.use('/question', questionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  httpErr(404, req, res, next);
});

module.exports = app;
