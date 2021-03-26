const fs = require('fs');
const { getJSONArr } = require('./io');
const { hashCode, varCheck } = require('./util');
const { LOGINFORM_A, LOGINFORM_B, LOGIN_SUCCESSFUL, PASSWORD_MISMATCH, USER_NOT_FOUND, USERSTORE, TYPE_MISMATCH, LOGOUT_BUTTON, NUMSTORE, USER_ERR_MSG, PWD_ERR_MSG, TYPE_ERR_MSG } = require('../constants');
/**
 * @author Ty Foster
 * @version 2021.03.25
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility functions for the FAQ Service Server
 */

/**
 * Constructs the footer for the webpages
 * 
 * @param {boolean} loggedIn signifies if the user making the request is logged in
 * @returns {string} html text representing the page footer;
 *  closes body, footer, and html tags
 */
const buildFooter = (loggedIn) => {
  // this method should always be called to end the `ServerMessage`
  let footer = '</body><footer>'; // closes body, starts footer
  if (loggedIn) {
    footer += fs.readFileSync(LOGOUT_BUTTON);
  } // ELSE -> display nothing in footer
  return footer + '</footer></html>'; // closes HTML tags
};

/**
 * Constructs header for a webpage on the server
 * 
 * @warn THIS SHOULD NOT BE USED FOR THE LOGIN PAGE
 * @param {string} uname a username for a user in the system
 * @param {string} utype the type for the user (`student` or `instructor`)
 * @returns {string} HTML text representing the header for a page with an 
 * open `html` tag and an open `body` tag
 */
const buildHeader = (uname, utype) => {
  // this method should always be called to start the `ServerMessage`
  // Assumes user is logged in
  let header = '<html><header>'; // opens HTML tag, starts header
  header += '<h4>' + uname + ', ' + utype + '</h4>';
  return header + '</header><body>';
};

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
 * Builds the login header based on whether or not the logout button was just
 * pressed and personalizes the page for the user if they have previously logged in.
 * 
 * @warn THIS SHOULD ONLY BE CALLED FOR THE LOGIN PAGE
 * @param {boolean} loggedOut set to `true` if logout button was last pressed button
 * @param {string} uname the username to add to the message
 * @param {string} utype the type of the user to display the message for
 * @param {number} status the status code of the last login attempt
 * @returns {string} HTML text representing the header for the login page with an 
 * open `html` tag and an open `body` tag
 */
const buildLoginHeader = (loggedOut, uname, utype, status) => {
  // this method should be called to start the `ServiceMessage` for the
  // login form
  let header = '<html><header>'; // opens HTML tag and header tag
  // make personalization method
  if (loggedOut) {
    header += '<h4 style="text-align: center;">See you again soon!</h4>';
  } else if (varCheck(uname) && varCheck(utype)) {
    header += '<h4 style="text-align: center;">Welcome back ' + utype + ' ' + uname;
    header += ', please enter your password.</h4>';
  } // ELSE -> display no personalized message
  // make error message
  switch(status) {
    case USER_NOT_FOUND:
      header += fs.readFileSync(USER_ERR_MSG);
      break;
    case PASSWORD_MISMATCH:
      header += fs.readFileSync(PWD_ERR_MSG);
      break;
    case TYPE_MISMATCH:
      header += fs.readFileSync(TYPE_ERR_MSG);
      break;
    default:
      break;
  }
  return header + '</header><body>'; // close header, open body
}

/**
 * Verifies that a provided `id` is known to the system
 * 
 * @param {string} id the user `id` to check against
 * @returns {boolean} `true` if the `id` matches known `id`s,
 * `false` otherwise
 */
const checkID = (id) => {
  if (id == 0 || id == '0' || id == undefined || id == null) {
    return false;
  }
  let nums  = getJSONArr(NUMSTORE); //TODO get ids from USERSTORE
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]); console.log(hashCode(String(id)));
    console.log(nums[i] == hashCode(String(id)));
    if (nums[i] == hashCode(id)) {
      return true
    }
  }
  return false;
}

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
      if (users[i].password == pwd && users[i].id == hashCode(pwd)) {
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
  buildFooter,
  buildHeader,
  buildLoginForm,
  buildLoginHeader,
  checkID,
  login,
  mapCookies
};