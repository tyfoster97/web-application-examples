const fs = require('fs');
const { getJSONArr } = require('./io');
const { varCheck } = require('./util');
const { QSTORE } = require('../constants');
/**
 * @author Ty Foster
 * @version 2021.03.28
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility functions used when searching for Q&A objects
 */

/**
 * Determines if `qObj.author` contains a `author` found in `auths`
 * 
 * @param {Object} qObj the Q&A Object to check the authors of
 * @param {Array<String>} auths an Array of authors to try and match
 * @returns {boolean} `true` if a match is found, `false` otherwise
 */
const authMatch = (qObj, auths) => {
  for (let i = 0; i < auths.length; i++) {
    if (qObj.author.toLowerCase().indexOf(auths[i].toLowerCase()) >= 0) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if `date` is between `start` and `end`
 * 
 * @param {string} date ISO date string of the date to check
 * @param {string} start ISO date string of the start of the time period
 * @param {string} end ISO date string of the end of the time period
 * @returns {boolean} `true` if `date` is on or between `start` and `end`, 
 * otherwise `false`
 */
const betweenDates = (date, start, end) => {
  // only check if a date was passed
  if (varCheck(date)) {
    let day = new Date(date);
    // check if start was provided, if not then set to earliest default date
    let startDay = (varCheck(start)) ? new Date(start) : new Date(0);
    // check if end was provided, if not then set to current time
    let endDay = (varCheck(end)) ? new Date(end) : new Date();
    // setHours to midnight to ignore difference
    day.setHours(0); startDay.setHours(0); endDay.setHours(0);
    // compare values
    return day >= startDay && day <= endDay;
  }
  // if no date is given return false
  return false;
}

/**
 * Obtains the index of a Q&A Object in `qArr` which has an `id`
 * matching `id` or a `question` matching `ques`
 * 
 * @param {Array<Object>} qArr the Array of Q&A Objects to search
 * @param {number} id the `id` of the Q&A Object desired
 * @param {string} ques the `question` of the Q&A Object desired
 * @returns index of the Q&A Object in `qArr` which has an `id`
 * equal to `id` or a `question` equal to `ques`, if no matching 
 * Q&A Object can be found `-1` is returned
 */
const getIdx = (qArr, id, ques) => {
  if (varCheck(id) || varCheck(ques)) {
    for (let i = 0; i < qArr.length; i++) {
      if (qArr[i].id == id || qArr[i].question == ques) {
        return i;
      }
    }
  }

  return -1;
};

/**
 * // TODO
 * @param {*} id 
 * @returns 
 */
const getQ = (id, ques) => {
  let fd = fs.openSync(QSTORE);
  let arr = getJSONArr(QSTORE);
  fs.closeSync(fd);
  let i = getIdx(arr, Number(id), ques);
  if (i >= 0) {
    return arr[i];
  }
  return null;
}

/**
 * Determines if `qObj.tags` contains a `tag` found in `tags`
 * 
 * @param {Object} qObj the Q&A Object to check the tags of
 * @param {Array<String>} tags an Array of tags to try and match
 * @returns {boolean} `true` if a match is found, `false` otherwise
 */
const tagMatch = (qObj, tags) => {
  for (let i = 0; i < tags.length; i++) {
    if (qObj.tags.toLowerCase().indexOf(tags[i].toLowerCase()) >= 0) {
      return true;
    }
  }
  return false;
};

module.exports = {
  authMatch,
  betweenDates,
  getIdx,
  getQ,
  tagMatch
};