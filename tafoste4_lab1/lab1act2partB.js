const { doMath, doExprB } = require('./util');
/**
 * @author Ty Foster
 * @version 2021.03.15
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 */

class Calc {
  constructor() {
    this.ans = 0;

    /***
     * Takes a JSON string and performs an add 
     * or subtract operation depending on the
     * JSON object
     * 
     * @param {string} str JSON string of an operation to calulate
     * @return {number} the calculated value
     */
    this.calc = (str) => {
      calculation(JSON.parse(str), this);
      return this.ans;
    };
  }
}

function calculation(obj, calc) {
  if (obj.op && obj.number) {
    calc.ans = doMath(calc.ans, obj.op, obj.number);
  } else if (obj.op && obj.expr) {
    calc.ans = doExprB(calc.ans, obj.op, obj.expr);
  }
}

/***
 * Takes a JSON Object Array and performs add 
 * or subtract operations. Checks answer 
 * provided against expected answer. Prints answer and expected value to console.
 * 
 * @param {Array} arr Array of JSON Objects representing operations to calculate
 */
function exec(arr) {
  let c = new Calc();
  /* for each object */
  arr.forEach(obj => {
    /* if the value has exp and expected as properties */
    if (obj.exp && obj.expected != null) {
      /* get the value for the op */
      calculation(obj.exp, c);
      /* output the calculated value compared to the expected */
      console.log(c.ans + ' = ' + obj.expected);
    }
  });
};
module.exports = { Calc, exec };