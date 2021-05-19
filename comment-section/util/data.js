const fs = require('fs');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains functions for interacting with data
 */

/**
 * Obtains the JSON Array stored in a file
 * 
 * @warn DOES NOT OPEN OR CLOSE FILE
 * @param {string} file the path to the file containing the JSON Array
 * @returns {Array<Object>} the JSON Array stored in the file
 */
function getJSONArr(file) {
  let arr = [];
  let data = fs.readFileSync(file);
  arr = JSON.parse(data);
  return arr;
}

/**
 * Stores a JSON Array in a file
 * 
 * @warn DOES NOT OPEN OR CLOSE FILE
 * @param {string} file the path to the file to hold the JSON Array
 * @param {Array<Object>} arr the JSON Array to store
 */
function storeJSONArr(file, arr) {
  fs.writeFileSync(file, JSON.stringify(arr));
}

module.exports = {
  getJSONArr,
  storeJSONArr
};
