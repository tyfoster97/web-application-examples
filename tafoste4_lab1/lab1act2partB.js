const { operation } = require('./util');
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
      return calcJSON(JSON.parse(str), this);
    };
  }
}

/**
     * Takes a JSON object and performs an add 
     * or subtract opteration.
     * 
     * @param {Object} obj 
     * @returns {number} the calculated value
     */
const calcJSON = (obj, calc) => {
  /* if obj has op and expr */
  if (obj.op && obj.expr) {
    /* get the value from b */
    let b = calcJSON(obj.expr, calc);
    /* determine the answer */
    calc.ans = doMath(obj.op, calc.ans, b);
    /* else if obj has op and number */
  } else if (obj.op && obj.number != null) {
    /* determine the answer */
    calc.ans = doMath(obj.op, calc.ans, obj.number);
  } // ELSE do nothing

  return calc.ans;
};

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
  arr.forEach((value, index, array) => {
    /* if the value has exp and expected as properties */
    if (value.exp && value.expected != null) {
      /* get the value for the op */
      let ans = calcJSON(value.exp, c);
      /* output the calculated value compared to the expected */
      console.log(ans + ' = ' + value.expected);
    }
  });
};
module.exports = { Calc, exec };