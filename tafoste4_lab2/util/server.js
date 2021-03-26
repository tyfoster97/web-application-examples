const fs = require('fs');
const { getJSONArr } = require('./io');
const { LOGINFORM_A, LOGINFORM_B, LOGIN_SUCCESSFUL, PASSWORD_MISMATCH, USER_NOT_FOUND, USERSTORE, TYPE_MISMATCH } = require('../constants');
/**
 * @author Ty Foster
 * @version 2021.03.24
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility functions for the FAQ Service Server
 */

/**
 * Builds the login page based on the username provided
 * 
 * @param {string} uname the username to add as a value to the Login form
 * @returns {string} well-formed HTML string representing a login page
 */
const buildLoginForm = (uname) => {
  let form = fs.readFileSync(LOGINFORM_A); // first part of form
  form += '<input type="text" name="username" value="' + uname + '"/></br>'; // set username
  form += fs.readFileSync(LOGINFORM_B); // second part of form
  return form;
};

/**
 * Logs in a user if login info matches
 * 
 * @param {string} uname the username to compare against
 * @param {string} pwd the password to compare against
 * @param {string} type the type of user
 * @returns {number} status code of the login (see constants.js for specific codes)
 */
const login = (uname, pwd, type) => {
  let users = getJSONArr(USERSTORE);
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == uname) {
      if (users[i].password == pwd) {
        if (users[i].type == type) {
          return LOGIN_SUCCESSFUL;
        }
        return TYPE_MISMATCH;
      }
      return PASSWORD_MISMATCH;
    }
  }
  return USER_NOT_FOUND;
};

/**
 * Takes an Array of cookie strings and converts them to a 
 * Map of cookie keys and values
 * 
 * @param {Array<string>} cookies an Array of `key` and `value` pairs delimited by `=`
 * @returns {Map<string, string>} representing cookie `key` and `value` pairs
 */
const mapCookies = (cookies) => {
  let cookieMap = new Map();
  cookies.forEach(cookie => {
    cookie = cookie.split('=');
    cookieMap.set(cookie[0], cookie[1]);
  });
  return cookieMap;
};

module.exports = {
  buildLoginForm,
  login,
  mapCookies
};