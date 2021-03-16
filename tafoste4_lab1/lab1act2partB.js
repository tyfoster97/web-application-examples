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
    Calc.prototype.calc = (str) => {
      return this.calcJSON(JSON.parse(str));
    };

    /**
     * 
     * @param {Object} obj 
     */
    Calc.prototype.calcJSON = (obj) => {
      /* if obj has op and expr */
      if (obj.op && obj.expr) {
        /* get the value from b */
        let b = this.calcJSON(obj.expr);
        /* determine the answer */
        this.ans = operation(obj.op, this.ans, b);
      /* else if obj has op and number */
      } else if (obj.op && obj.number != null) {
        /* determine the answer */
        this.ans = operation(obj.op, this.ans, obj.number);
      } // ELSE do nothing

      return this.ans;
    };
  }
}



/**
 * PRIVATE HELPER FUNCTION
 * @param {string} op operation to perform
 * @param {number} a number from calculator
 * @param {number} b number from calculation object
 * @returns {number} result of operation
 */
function operation(op, a, b) {
  if (op == 'add') {
    return a + b;
  } else if (op == 'subtract') {
    return a - b;
  } // ELSE do nothing with b

  return a;
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
      let ans = c.calcJSON(value.exp);
      /* output the calculated value compared to the expected */
      console.log(ans + ' = ' + value.expected);
    }
  });
};
module.exports = { Calc, exec };