const fs = require('fs');
const { genID, varCheck } = require("./util/util");
const { QSTORE } = require('./constants');
const { getJSONArr, writeJSONArr } = require("./util/io");
const { getIdx, getQ, authMatch, tagMatch, betweenDates } = require("./util/search");
/**
 * @author Ty Foster
 * @version 2021.03.28
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 * CONTRAINTS
 * 1. Prevent concurrent read/write problems
 * 2. Q&A has question, answer, tags, author, date, and id
 * 3. Persistent store must be in QA.json 
 */

class FAQ {
  /**
   * CONSTRUCTOR
   * @param {Object} obj `FAQ` Object to construct
   */
  constructor(obj) {
    this.question = obj.question || '';
    this.answer = obj.answer || '';
    this.author = obj.author || '';
    this.tags = obj.tags || '';
    this.date = obj.date || new Date();
    this.id = obj.id || genID();

    /**
     * Checks if the `FAQ` object can pass a filter
     * 
     * @param {Array<string>} auths authors to check
     * @param {Array<string>} tags tags to check
     * @param {string} start beginning of date range to check
     * @param {string} end end of date range to check
     * @returns {boolean} `true` if the `FAQ` passes the filter, otherwise `false`
     */
    this.filter = (auths, tags, start, end) => {
      let match = true; // assumes no filter params
      // check auths
      if (varCheck(auths) && match) {
        match = authMatch(this, auths);
      }
      // check tags
      if (varCheck(tags) && match) {
        match = tagMatch(this, tags);
      }
      // check date range
      if ((varCheck(start) || varCheck(end)) && match) {
        match = betweenDates(this.date, start, end);
      }
      return match; // returns true if no filters given
    }

    /**
     * Saves `FAQ` to database
     * @warn OVERWRITES DATA IN DATABASE
     */
    this.save = () => {
      let fd = fs.openSync(QSTORE); // lock file

      let arr = getJSONArr(QSTORE, 'r+'); // read in current file

      let idx = getIdx(arr, this.id, this.question);
      switch (idx) {
        case -1:
          // add new question
          arr.push(this);
          break;
        default:
          // overwrite question
          arr[idx] = this;
          break;
      }

      writeJSONArr(QSTORE, arr); // write out new array

      fs.closeSync(fd); // unlock file
    }

    /**
     * Updates the `FAQ` fields
     * 
     * @warn UPDATES THE DATE FOR THE `FAQ`
     * @param {string} ques text for the question
     * @param {string} ans text for the answer
     * @param {string} auth the list of authors
     * @param {string} tags the list of tags
     */
    this.update = (ques, ans, auth, tags) => {
      if (varCheck(ques)) { this.question = ques; } // update ques
      if (varCheck(ans)) { this.answer = ans; } // update ans
      if (varCheck(auth)) { this.author = auth; } // update auth
      if (varCheck(tags)) { this.tags = tags; } // update tags
      this.date = new Date(); // set date to now
    }
  }
}

/**
 * Adds a question to the existing persistent store
 * 
 * @param {string} ques the frequently asked question
 * @param {string} ans answer to the question
 * @param {string} auth the author of the answer
 * @param {string} tags a set of comma delimeted 
 * tags associated with the question
 */
function addQuestion(ques, ans, auth, tags) {
  let faq = new FAQ(
    {
      question: ques,
      answer: ans,
      author: auth,
      tags: tags
    }
  ); // make question object
  faq.save(); // place in memory store
}

/**
 * Updates a question in the database
 * 
 * @param {number} id the database `id` for the `FAQ`
 * @param {string} ques the text of the question
 * @param {string} ans the text of the answer
 * @param {string} auth the list of authors
 * @param {string} tags the list of tags
 */
function updateQuestion(id, ques, ans, auth, tags) {
  let q = getQ(id, ques);
  let faq = new FAQ(q);
  faq.update(ques, ans, auth, tags); // update info
  faq.save(); // write to database
}

/**
 * Deletes the specified question if found
 * 
 * @param {number} id the `id` of the Q&A Object to delete
 * @param {string} ques the `question` of the Q&A Object to delete
 */
function deleteQuestion(id, ques) {
  if (varCheck(id) || varCheck(ques)) {
    // only try if params were passed
    let fd = fs.openSync(QSTORE, 'r+'); // lock file

    let arr = getJSONArr(QSTORE);
    let idx = getIdx(arr, id, ques);
    if (idx >= 0) {
      arr.splice(idx, 1); // remove question
      writeJSONArr(QSTORE, arr); // only write if modified
    }

    fs.closeSync(fd); // unlock file
  }
}

/**
 * Filters the `FAQ` database
 * 
 * @param {string} auths set of comma delimited authors
 * @param {string} tags set of comma delimited tags
 * @param {string} startDate start of date range
 * @param {string} endDate end of date range
 * @returns {Array<FAQ>} the set of filtered FAQ objects
 */
function filterDatabase(auths, tags, startDate, endDate) {
  // process auths and tags to arrays from strings
  if (varCheck(auths)) { auths = auths.split(/,\s+/); }
  if (varCheck(tags)) { tags = tags.split(/,\s+/); }

  let fd = fs.openSync(QSTORE, 'r+'); // lock file

  let arr = getJSONArr(QSTORE); // read in data

  arr = arr.filter(
    (obj) => 
      new FAQ(obj)
      .filter(auths, tags, startDate, endDate)
  );
  
  fs.closeSync(fd); // unlock file

  return arr;
}

module.exports = {
  FAQ,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  filterDatabase
};
