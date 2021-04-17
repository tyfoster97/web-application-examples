var express = require('express');
const { connect, close } = require('../utils/db');
const { Stack } = require('../utils/stack');
var router = express.Router();

/* GET history of commands */
router.get('/', async function(req, res, next) {
  await connect();
  const s = (await Stack.findOne()).toJSON();
  await close();
  const msg = JSON.stringify({
    op: 'history',
    stack: s.stack
  });
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(msg);
});

module.exports = router;
