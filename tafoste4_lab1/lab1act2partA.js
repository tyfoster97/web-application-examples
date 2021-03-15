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
      let obj = JSON.parse(str); //parse object

      if (obj.op == 'add') {
        this.ans += obj.number; //if add, then add number
      } else if (obj.op == 'subtract') {
        this.ans -= obj.number; //elif sub, then sub number
      } //else do nothing

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
  arr.forEach((value, index, array) => {
    /* get the value for the op */
    let ans = c.calc(JSON.stringify(value.exp));
    /* output the calculated value compared to the expected */
    console.log(ans + ' = ' + value.expected);
  });
};

module.exports = { Calc, exec };