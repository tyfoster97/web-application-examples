const dict = { "dictionary_name": "default", "entries": [{ "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"], "answer": ["educated", "informed", "schooled"] }, { "key": ["unattractive", "hideous", "ugly"], "answer": ["attractive", "beauteous", "beautiful", "lovely", "pretty", "ravishing"] }, { "key": ["ambiguous", "cryptic", "dark", "nebulous", "obscure", "unintelligible"], "answer": ["obvious", "plain", "unambiguous", "understandable", "unequivocal"] }, { "key": ["incapable", "incompetent", "inept", "unable", "unfit", "unqualified", "weak", "artless"], "answer": ["accomplished", "fit", "adept", "complete", "consummate"] }, { "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"], "answer": ["benevolent", "benignant", "gentle", "kind", "clement"] }, { "key": ["idle"], "answer": ["Can you reply something?", "You have been idle for more than 30 seconds", "Whats the matter with you? Submit something"] }] };
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
   * @param {Object} obj the key: value pair
   * @returns {boolean} `true` if the data was added, `false` otherwise
   */
  static addData(obj) {
    let added = false;
    // check if obj has valid key
    const keys = Dictionary.keys();
    for (const key of keys) {
      if (obj[key]) {
        // add obj[key] to entry with key as key
        const idx = Dictionary._entryIdx(key);
        Entry.addAnswer(dict.entries[idx], obj[key]);
        added = true;
      }
    }
    return added;
  }

  /**
   * Censors words in the dictionary if there is a match
   * to a key in a Dictionary
   * 
   * @param {Array<string>} arr the Array of strings to censor
   */
  static censor(arr) {
    const keys = Dictionary.keys(); // saves compute time
    // loop through every element in arr
    for (const i in arr) {
      const key = arr[i].replace(/[^\w-]/g, ''); // remove punctuation
      if (keys.includes(key) && key != 'idle') { // key is in dictionary and is not idle
        // idle ignored because it is supposed to be used to display idle message
        // find replacement
        const ans = Dictionary._answer(key);
        arr[i] = arr[i].replace(key, ans); // replace
      }
    }
  }

  /**
   * Obtains an idle message from a Dictionary
   * 
   * @returns {string} the idle message
   */
  static idleMsg() {
    return Dictionary._answer('idle');
  }

  /**
   * Obtains the list of all keys in all Entries in the Dictionary
   * 
   * @param {Dictionary} d the Dictionary
   * @returns the keys in the Dictionary
   */
  static keys() {
    let keys = [];
    for (const entry of dict.entries) {
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
   * @param {string} key the key for the Entry
   * @returns {string} the answer from the Entry
   */
   static _answer(key) {
    const entry = Dictionary._entry(key);
    return Entry.getAnswer(entry);
  }

  /**
   * Finds the Entry with a matching key in a Dictionary
   * 
   * @param {string} key the key
   * @returns {Entry} the Entry, `null` if no Entry can be found
   */
  static _entry(key) {
    let entry = null;
    for (let i = 0; i < dict.entries.length && !entry; i++) {
      if (dict.entries[i].key.includes(key)) {
        entry = dict.entries[i];
      }
    }
    return entry;
  }

  /**
   * Determines the index of an Entry with a matching key in its
   * key list.
   * 
   * @param {string} key the key to match
   * @returns {number} the index
   */
  static _entryIdx(key) {
    let idx = -1;
    for (const i in dict.entries) {
      if (dict.entries[i].key.includes(key)) {
        idx = i;
      }
    }
    return idx;
  }
}
//module.exports = { Dictionary }; // FOR TESTING
//const { Entry } = require('./entry'); // FOR TESTING
