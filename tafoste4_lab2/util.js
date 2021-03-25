const fs = require('fs');
const indent = 2; // no magic numbers
/**
 * @author Ty Foster
 * @version 2021.03.24
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 */

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

/**
 * Generates a unique identifier
 * 
 * @returns {number} ID number
 */
const genID = () => {
  id = Date.now();
  id += Math.random();
  return id;
}

/**
 * Reads in the Q&A array stored in the data store and returns an array
 * of the Q&A objects
 * 
 * @warn DOES NOT LOCK FILE
 * @param {string} path the path to the file which stores the Q&A JSON array 
 * @return {Array<Object>} an array of Q&A objects with properties `question`,
 * `answer`, `author`, `tags`, `date`, and `id`
 */
const getQArr = (path) => {
  let data = fs.readFileSync(path);
  return JSON.parse(data);
}

/**
 * Writes `qArr` to specified file located at `path`
 * 
 * @warn DOES NOT UNLOCK FILE
 * @param {string} path path from current directory to the Q&A store
 * @param {Array<Object>} qArr array of question objects with properties
 * `question`, `answer`, `author`, `date`, `tags`, and `id`
 */
const writeQArr = (path, qArr) => {
  fs.writeFileSync(path, JSON.stringify(qArr, null, indent));
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
  if (varCheck(id)) {
    for (let i = 0; i < qArr.length; i++) {
      if (qArr[i].id === id) {
        return i;
      }
    }
  } else if (varCheck(ques)) {
    for (let i = 0; i < qArr.length; i++) {
      if (qArr[i].question == ques) {
        return i;
      }
    }
  }

  return -1;
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
    if (qObj.tags.indexOf(tags[i]) >= 0) {
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

module.exports = { varCheck, genID, getQArr, writeQArr, getIdx, tagMatch, betweenDates };