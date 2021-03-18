const { doOp } = require('./util');
/**
 * @author Ty Foster
 * @version 2021.03.15
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 */

class PreCalc {
  constructor(num) {
    this.calcStack = (num) ? [num] : [0];
    this.ans = this.calcStack[0];

    this.calc = (str) => {
      return operation(JSON.parse(str), this);
    };
  }
}

function operation(obj, calc) {
  if (obj.op) {
    return doOp(calc, obj);
  }
}

function exec(arr) {
  let c = new PreCalc();

  arr.forEach((obj) => {
    operation(obj.exp, c);

    console.log(c.ans + ' = ' + obj.expected);
  });
}

module.exports = { PreCalc, exec };
