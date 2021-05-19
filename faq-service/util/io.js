const fs = require('fs');
/**
 * @author Ty Foster
 * @version 2021.03.24
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility functions for file I/O
 */

/**
 * Reads in the JSON Array stored in the file and returns an Array
 * of the Objects
 * 
 * @warn DOES NOT LOCK FILE
 * @param {string} path the path to the file which stores the JSON array 
 * @return {Array<Object>} an array of objects
 */
const getJSONArr = (path) => {
  let data = fs.readFileSync(path);
  return JSON.parse(data);
};

/**
 * Writes `arr` to specified file located at `path`
 * 
 * @warn DOES NOT UNLOCK FILE
 * @param {string} path path to the file
 * @param {Array<Object>} arr array of objects
 */
const writeJSONArr = (path, arr) => {
  let indent = 2; // 2 spaces per indent
  fs.writeFileSync(path, JSON.stringify(arr, null, indent));
};

module.exports = {
  getJSONArr,
  writeJSONArr
};
