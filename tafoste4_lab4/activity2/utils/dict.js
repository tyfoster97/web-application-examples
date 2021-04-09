const fs = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const store = join(__dirname, '../dictionary-1.json');
/**
 * @file io.js
 * @version 2021.04.09
 * @author Ty Foster
 * 
 * Contains functions for interacting with the dictionary
 */


/**
 * Pulls the Dictionary from the flat file
 * 
 * @returns {Object} dictionary with keys and value pairs
 */
async function getDictionary() {
  const data = await readFile(store);
  const dictionary = JSON.parse(data);
  return dictionary;
}

/**
 * Writes Dictionary to flat file
 * 
 * @param {Object} dictionary a dictionary with key and value pairs
 */
async function storeDictionary(dictionary) {
  const data = JSON.stringify(dictionary);
  await writeFile(store, data);
}

module.exports = {
  getDictionary,
  storeDictionary
};
