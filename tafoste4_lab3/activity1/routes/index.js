var express = require('express');
const { getComments } = require('../util/comment');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const store = path.join(__dirname, '../public/articles/article.txt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Cache-Control', 'no-store');
  res.render('index', { title: 'Activity 1', article: fs.readFileSync(store), comments: getComments() });
});

module.exports = router;
