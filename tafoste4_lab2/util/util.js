/**
 * @author Ty Foster
 * @version 2021.03.26
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains generic utility functions 
 */

/**
 * Generates a unique identifier
 * 
 * @param {string} seed optional seed
 * @returns {number} ID number
 */
const genID = (seed) => {
  let id;
  if (seed == undefined || seed == null) {
    id = Date.now();
    id += Math.random();
  } else {
    id = hashCode(seed);
  }
  return id;
};

/**
 * Determines if a variable has been defined.
 * 
 * @param {any} v variable to check
 * @returns {boolean} true if v has a value, false otherwise
 */
const varCheck = (v) => {
  if (v == undefined || v == null || v.length == 0) {
    return false;
  }
  return true;
};

const hashCode = (str) => {
  var hash = 0;
  if (str.length == undefined || str.length == 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    hash = ((hash<<5)-hash) + c;
    hash = hash & hash;
  }
  return hash;
}

module.exports = {
  hashCode,
  genID,
  varCheck
};

