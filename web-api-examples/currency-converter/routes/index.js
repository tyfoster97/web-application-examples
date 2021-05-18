var express = require('express');
const path = require('path');
const { connect, close } = require('../utils/db');
const { Stack } = require('../utils/stack');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  await connect();
  const s = await Stack.findOne();
  const canReset = await s.canClear();
  await close();
  res.render('index', {disabled: (!canReset)});
});

module.exports = router;
