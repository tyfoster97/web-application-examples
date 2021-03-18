const { doMath } = require('./util');
/**
 * @author Ty Foster
 * @version 2021.03.15
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 */
'use strict';

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
    this.calc = function (str) {
      let obj = JSON.parse(str); // get object

      /* if valid props -> do math */
      if (obj.op && obj.number) {
        this.ans = doMath(this.ans, obj.op, obj.number);
      }
      return this.ans;
    };
  }

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
  arr.forEach(obj => {
    if (obj.exp && obj.expected != null && obj.exp.op && obj.exp.number) {
      c.ans = doMath(c.ans, obj.exp.op, obj.exp.number);
      console.log(c.ans + ' = ' + obj.expected);
    }
  });
};

module.exports = { Calc, exec };