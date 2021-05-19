const fs = require('fs');
const path = require('path');
const { getJSONArr, storeJSONArr } = require('./data');
const { isVar } = require('./util');
const store = path.join(__dirname, '../data/comments.json');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains functions for interacting with the comments data store
 */

/**
 * Object representation of a Comment in the data store
 */
class Comment {
  /**
   * Constructor
   * @param {string} id the unique identifier for the comment
   * @param {string} comment the text for the comment
   */
  constructor(id, comment) {
    this.id = id;
    this.comment = comment;
  }
}

/**
 * Adds a comment to the data store
 * 
 * @param {string} id the unique id for the comment
 * @param {string} text the content for the comment
 * @returns {boolean} `true` if the comment was added to
 * the data store, `false` otherwise
 */
function addComment(id, text) {
  // check variables
  let added = (isVar(id) && isVar(text) && id!='' && text!='');
  if (added) { // variable check
    let fd = fs.openSync(store, 'r+'); // locks data store
    let comments = getJSONArr(store);
    let idx = _checkID(comments, id);
    if (idx === -1) { // no matches found -> add to store
      let c = new Comment(id, text);
      comments.push(c);
      storeJSONArr(store, comments);
    } else { // id in use
      added = false;
    }
    fs.closeSync(fd); // unlocks data store
  } else {
    added = false;
  }
  return added;
}

/**
 * Clears all of the comments in the data store
 * 
 * @returns {boolean} `true` to indicate the comment
 * data store was cleared
 */
function clearComments() {
  storeJSONArr(store, []);
  return true;
}

/**
 * Deletes a comment from the data store
 * 
 * @param {string} id the unique id for the comment
 * @returns {Comment} the `Comment` that was deleted,
 * `undefined` if no comment was found
 */
function deleteComment(id) {
  let deleted;
  if (isVar(id) && id != '') {
    let fd = fs.openSync(store, 'r+'); // locks data store
    let comments = getJSONArr(store); // loads data store
    let idx = _checkID(comments, id); // check for match
    if (idx != -1) { // if a match is found -> delete from store
      deleted = comments.splice(idx, 1)[0]; // removes comment
      storeJSONArr(store, comments);
    }
    fs.closeSync(fd); // unlocks data store
  }
  return deleted;
}

/**
 * Gets all of the comments in the data store
 * 
 * @returns {Array<Comment>} the array of Comment objects to 
 */
function getComments() {
  let comments = getJSONArr(store);
  return comments || [];
}

module.exports = {
  addComment,
  clearComments,
  deleteComment,
  getComments
};

/**
 * Determines the index of the comment with the matching id in an
 * array of comments.
 * 
 * @param {Array<Comment>} comments the comments from the data store
 * @param {string} id the id to match
 * @returns {number} index location of the comment with a matching
 * id if found, `-1` if no match can be found
 */
function _checkID(comments, id) {
  let idx = -1;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      idx = i;
    }
  }
  return idx;
}
