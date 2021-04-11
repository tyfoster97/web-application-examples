/**
 * @file dictionary.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Utility functions for interacting with the Dictionary in memory
 */

/**
 * Represents a Dictionary
 * 
 * @prop {string} dictionary_name
 * @prop {Array<Entry>} entries
 * 
 * @func Dictionary - CONSTRUCTOR
 * @func addData - attempts to add data to a Dictionary, indicates success
 * @func censor - uses a Dictionary to censor an Array of strings
 * @func idleMsg - Obtains an idle message from a Dictionary
 * @func keys - gets the list of all keys in a Dictionary
 * @func _answer - gets an answer from an Entry for a key
 * @func _entry - get an Entry from a Dictionary with a matching key
 * @func _entryIdx - get the index of an Entry in the Dictionary with
 * a matching key
 */
class Dictionary {
  /**
   * CONSTRUCTOR
   * @param {string} name the name of the Dictionary
   * @param {Array<Entry>} entries the list of Dictionary Entry items
   */
  constructor(name, entries) {
    this.dictionary_name = name || '';
    this.entries = entries || [];
  }

  /**
   * Attempts to add data to Dictionary, indicates if data was added
   * 
   * @param {Dictionary} d the Dictionary
   * @param {Object} obj the key: value pair
   * @returns {boolean} `true` if the data was added, `false` otherwise
   */
  static addData(d, obj) {
    let added = false;
    // check if obj has valid key
    const keys = Dictionary.keys(d);
    for (const key of keys) {
      if (obj[key]) {
        // add obj[key] to entry with key as key
        const idx = Dictionary._entryIdx(d, key);
        Entry.addAnswer(d.entries[idx], obj[key]);
        added = true;
      }
    }
    return added;
  }

  /**
   * Censors words in the dictionary if there is a match
   * to a key in a Dictionary
   * 
   * @param {Dictionary} d the Dictionary
   * @param {Array<string>} arr the Array of strings to censor
   */
  static censor(d, arr) {
    const keys = Dictionary.keys(d); // saves compute time
    // loop through every element in arr
    for (const i in arr) {
      const key = arr[i].replace(/[^\w-]/g, ''); // remove punctuation
      if (keys.includes(key) && key != 'idle') { // key is in dictionary and is not idle
        // idle ignored because it is supposed to be used to display idle message
        // find replacement
        const ans = Dictionary._answer(d, key);
        arr[i] = arr[i].replace(key, ans); // replace
      }
    }
  }

  /**
   * Obtains an idle message from a Dictionary
   * 
   * @param {Dictionary} d the Dictionary to use
   * @returns {string} the idle message
   */
  static idleMsg(d) {
    return Dictionary._answer(d, 'idle');
  }

  /**
   * Obtains the list of all keys in all Entries in the Dictionary
   * 
   * @param {Dictionary} d the Dictionary
   * @returns the keys in the Dictionary
   */
  static keys(d) {
    let keys = [];
    for (const entry of d.entries) {
      for (const key of entry.key) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Gets an answer from an Entry with a matching key
   * 
   * @warn ASSUMES ENTRY EXISTS
   * @param {Dictionary} d the Dictionary with the Entry
   * @param {string} key the key for the Entry
   * @returns {string} the answer from the Entry
   */
   static _answer(d, key) {
    const entry = Dictionary._entry(d, key);
    return Entry.getAnswer(entry);
  }

  /**
   * Finds the Entry with a matching key in a Dictionary
   * 
   * @param {Dictionary} d the Dictionary
   * @param {string} key the key
   * @returns {Entry} the Entry, `null` if no Entry can be found
   */
  static _entry(d, key) {
    let entry = null;
    for (let i = 0; i < d.entries.length && !entry; i++) {
      if (d.entries[i].key.includes(key)) {
        entry = d.entries[i];
      }
    }
    return entry;
  }

  /**
   * Determines the index of an Entry with a matching key in its
   * key list.
   * 
   * @param {Dictionary} d the Dictionary
   * @param {string} key the key to match
   * @returns {number} the index
   */
  static _entryIdx(d, key) {
    let idx = -1;
    for (const i in d.entries) {
      if (d.entries[i].key.includes(key)) {
        idx = i;
      }
    }
    return idx;
  }
}
//module.exports = { Dictionary }; // FOR TESTING
//const { Entry } = require('./entry'); // FOR TESTING
