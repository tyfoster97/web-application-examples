var express = require('express');
var router = express.Router();
const conversion = 0.78;

/* POST conversion. */
router.post('/', function(req, res, next) {
  const amt = req.query.amount * conversion;
  //TODO push op to stack
  const msg = JSON.stringify(
    {
      op: 'pound',
      currency: 'POUND',
      amount: amt,
      stack: [] //FIX get stack
    });
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(msg);
});

module.exports = router;
