var express = require('express');
const { connect, close } = require('../utils/db');
const { httpErr } = require('../utils/util');
const { Stack } = require('../utils/stack');
var router = express.Router();

/* GET refreshed home page. */
router.get('/', async function(req, res, next) {
  await connect();
  const s = await Stack.findOne();
  await s.clear();
  const msg = JSON.stringify({
    op: 'reset',
    stack: (await Stack.findOne()).toJSON().stack
  });
  await close();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(msg);
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
});

module.exports = router;
