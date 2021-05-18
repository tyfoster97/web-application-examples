var express = require('express');
const { connect, close } = require('../utils/db');
const { pushToStack } = require('../utils/operation');
const { httpErr } = require('../utils/util');
const { Stack } = require('../utils/stack');
var router = express.Router();
const conversion = 0.78;

/* POST conversion. */
router.post('/', async function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  if (isNaN(req.query.amount)) {
    res.status(400);
    res.send(`{ "error": ${req.query.amount} is not a number }`);
  }
  const amt = req.query.amount * conversion; // perform
  // push to stack
  await connect();
  await pushToStack(
    req.query.amount,
    amt, 'POUND',
    req.headers['user-agent'],
    req.headers.host
  );
  const msg = JSON.stringify(
    {
      op: 'pound',
      currency: 'POUND',
      amount: amt,
      stack: (await Stack.findOne()).toJSON().stack
    });
  await close();
  res.send(msg);
});

router.all('/', function(req, res, next) {
  httpErr(405, req, res, next);
});

module.exports = router;
