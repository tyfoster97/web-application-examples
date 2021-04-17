const mongoose = require('mongoose');
/*******************************************************************************
 * @file stack.js
 * @version 2021.04.16
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 * Contains functions for interacting with a stack
 */

/***********************************************************
 * Represents a MongoDB Schema for a Stack
 *
 * @param {number} size the number of elements
 * @param {Array<Object>} stack the stack
 */
const StackSchema = new mongoose.Schema({
  size: {
    type: Number,
    min: 0,
    required: true
  },
  stack: {
    type: Array,
    required: true
  }
});

/***********************************************************
 * Pushes an item to the stack
 *
 * @param {Object} obj the object to add to the stack
 */
StackSchema.methods.push = async function (obj) {
  if (obj) {
    this.size++;
    this.stack.push(obj);
    await this.save();
  }
};

/***********************************************************
 * Pops an item from the stack
 *
 * @returns the item popped from the stack, returns
 * an empty Object if the stack is empty
 */
StackSchema.methods.pop = async function () {
  let ret = {};
  if (this.size > 0) { // there are elements
    this.size--;
    ret = this.stack.pop();
    await this.save();
  }
  return ret;
};

/***********************************************************
 * Clears all the elements in the stack
 */
StackSchema.methods.clear = async function () {
  this.size = 0;
  this.stack = [];
  await this.save();
};

/***********************************************************
 * MongoDB Model for the Stack
 */
const Stack = mongoose.model('Stack', StackSchema);

module.exports = {
  Stack
};
