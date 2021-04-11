/**
 * @file entry.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Utility functions for interacting with an Entry in a Dictionary
 */

/**
 * Represents an entry in the dictionary
 * 
 * @prop {Array<string>} key - the keys for the entry
 * @prop {Array<string>} answer - the answers for replacing keys
 * 
 * @func Entry - CONSTRUCTOR
 * @func addAnswer - adds an answer to an Entry, ignores repeats
 * @func hasKey - checks if an Entry has a key
 * @func getAnswer - selects an answer from the Entry
 */
class Entry {
  /**
   * Constructor
   * @param {Array<string>} keys the Entry keys
   * @param {Array<string>} answers the Entry answers
   * @returns {Entry} the Entry created
   */
  constructor(keys, answers) {
    this.key = keys || [];
    this.answer = answers || [];
  }

  /**
   * Adds answers to the entry, ignores repeated answers
   * 
   * @param {Entry} e the Entry to modify
   * @param {Array<string>} answer the answers to add
   */
  static addAnswer(e, answer) {
    if (!e.answer.includes(answer)) {
      e.answer.push(answer);
    }
  }

  /**
   * Checks if the Entry key array includes the value `k`
   * 
   * @param {Entry} e the Entry to check
   * @param {string} k key to check
   * @returns {boolean} `true` if `k` is in `this.key`, `false` otherwise
   */
  static hasKey(e, k) {
    return e.key.includes(k);
  };

  /**
   * Gets an answer from the Entry
   * 
   * @returns {string} an answer from the `answer` Array
   */
  static getAnswer(e) {
    let answer = '';
    if (e.answer.length > 0) {
      answer = e.answer[Math.floor(Math.random() * e.answer.length)]; // randomly select
    }
    return answer;
  };
}
//module.exports = { Entry }; // FOR TESTING
