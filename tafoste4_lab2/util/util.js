/**
 * @author Ty Foster
 * @version 2021.03.24
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains generic utility functions 
 */

/**
 * Generates a unique identifier
 * 
 * @returns {number} ID number
 */
const genID = () => {
  id = Date.now();
  id += Math.random();
  return id;
};

/**
 * Determines if a variable has been defined.
 * 
 * @param {any} v variable to check
 * @returns {boolean} true if v has a value, false otherwise
 */
const varCheck = (v) => {
  if (v == undefined || v == null) {
    return false;
  }
  return true;
};

module.exports = {
  genID,
  varCheck
};

