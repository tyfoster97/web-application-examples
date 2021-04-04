/**
 * @author Ty Foster
 * @version 2021.04.01
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains generic utility functions 
 */

/**
 * Checks if a variable is defined
 * 
 * @param {any} v variable to check
 * @returns {boolean} `false` if `v` is `undefined` or `null`,
 * otherwise `true`
 */
function isVar(v) {
  let isvar = true;
  if (v === null || v === undefined) {
    isvar = false;
  }
  return isvar;
}

module.exports = {
  isVar
};
