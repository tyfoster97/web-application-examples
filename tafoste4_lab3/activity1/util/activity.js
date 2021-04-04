const fs = require('fs');
const path = require('path');
const { addComment, deleteComment } = require('./comment');
const { getJSONArr, storeJSONArr } = require('./data');
const { isVar } = require("./util");
const store = path.join(__dirname, '../data/activity.json');
/**
 * @author Ty Foster
 * @version 2021.04.01
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains functions for interacting with the activity data store
 */

/**
 * Operation codes
 */
const ops = { // makes code easier to refactor
  ADD: 'add',
  DELETE: 'del'
};

/**
 * Represents the data in an activity
 */
class Activity {
  /**
   * Constructor
   * 
   * @param {string} operation `ops.ADD` for add comment, 
   * `ops.DELETE` for delete comment
   * @param {Comment} operand the subject of the operation
   * @param {string} agent the string representation of the 
   * HTTP `User-Agent` header
   * @param {string} ip the ip address of the client that 
   * performed the operation
   */
  constructor(operation, operand, agent, ip) {
    this.op = operation;
    this.operand = operand;
    this.ip = ip
    this.agent = agent;
  }
}

/**
 * 
 * @param {string} op `ops.ADD` for add comment, 
 * `ops.DELETE` for delete comment
 * @param {Comment} operand the subject of the operation
 * @param {string} agent the string representation of the 
 * HTTP `User-Agent` header
 * @param {string} ip the ip address of the client that 
 * performed the operation
 * @returns {boolean} `true` if add was successful, `false`
 * otherwise
 */
function addActivity(op, operand, agent, ip) {
  //null check
  let added = 
    isVar(op) && (op === ops.ADD || op === ops.DELETE) && // check op
    isVar(operand) && (isVar(operand.id) && isVar(operand.comment)) && // check operand
    isVar(agent) && agent != '' && // check agent
    isVar(ip) && ip != ''; // check ip
  if (added) {
    let fd = fs.openSync(store);
    let action = new Activity(op, operand, agent, ip);
    let activities = getJSONArr(store);
    activities.unshift(action); // put at start of stack
    storeJSONArr(store, activities);
    fs.closeSync(fd);
  }
  return added;
}

/**
 * Clears the User Activity stack
 * 
 * @returns {boolean} `true` after the stack is reset
 */
function clearActivity() {
  storeJSONArr(store, []);
  return true;
}

/**
 * Obtains the User Activity stack
 * 
 * @returns {Array<Activity>} the history of user activity
 */
function getActivity() {
  let activities = getJSONArr(store);
  return activities || [];
}

/**
 * Undoes the last user activity
 * 
 * @returns {boolean} `true` if the action could be undone,
 * `false` otherwise
 */
function undoActivity() {
  let undone;
  let fd = fs.openSync(store);
  let activities = getJSONArr(store);
  undone = activities.length > 0;
  if (undone) { // stack has items
    let activity = activities.shift(); // pop activitiy off stack
    // attempt to undo action
    undone = _undoAct(activity.op, activity.operand);
    // if the action was undone write out to stack
    if (undone) {
      storeJSONArr(store, activities);
    }
  }
  fs.closeSync(fd);
  return undone;
}

module.exports = {
  addActivity,
  clearActivity,
  getActivity,
  ops,
  undoActivity
};

/**
 * Undoes the specific activity operation
 * 
 * @param {string} op the operation to undo
 * @param {Comment} operand the comment the operation was performed on 
 * @returns {boolean} `true` if the activity was undone, `false` otherwise
 */
function _undoAct(op, operand) {
  let undone;
  switch(op) {
    case ops.ADD:
      undone = isVar(deleteComment(operand.id));
      break;
    case ops.DELETE:
      undone = addComment(operand.id, operand.comment);
      break;
    default:
      undone = false;
      break;
  }
  return undone;
}
