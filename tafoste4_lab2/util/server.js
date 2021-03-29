const fs = require('fs');
const { getJSONArr } = require('./io');
const { hashCode, varCheck } = require('./util');
const { LOGINFORM_A, LOGINFORM_B, LOGIN_SUCCESSFUL, PASSWORD_MISMATCH, USER_NOT_FOUND, USERSTORE, TYPE_MISMATCH, LOGOUT_BUTTON, NUMSTORE, USER_ERR_MSG, PWD_ERR_MSG, TYPE_ERR_MSG, SEARCH_BAR_STU, SEARCH_BAR_INST, ADD_QA, EDIT_QA_A, EDIT_QA_B, EDIT_QA_C, EDIT_QA_D } = require('../constants');
const { filterDatabase } = require('../FAQ');
const { getQ } = require('./search');
/**
 * @author Ty Foster
 * @version 2021.03.28
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 * 
 * Contains utility functions for the FAQ Service Server
 */

/**
 * //TODO
 * @param {*} res 
 * @param {*} cookieMap 
 */
const addQAPage = (res, cookieMap) => {
  let body = '<body>';
  body += fs.readFileSync(ADD_QA);
  body += '</body>';
  _loadPage(res, cookieMap, body, true);
};

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
  let nums = getJSONArr(NUMSTORE); //TODO get ids from USERSTORE
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == hashCode(id)) {
      return true
    }
  }
  return false;
};

/**
 * 
 * @param {*} res 
 * @param {*} cookieMap 
 */
const delQAPage = (res, cookieMap) => {
  let qObj = getQ(cookieMap.get('quesid'), null);
  let body = '<body">';
  body += '<div style="text-align: center;"><h2 style="color: red;"> Are you sure you want to delete this question? </h2>';
  body += _qa(qObj, true);
  body += '<form method="POST" action="">' +
    '<input type="submit" name="confirmdel" value="Confirm" />' + 
    '<input type="submit" name="cancel" value="Cancel" />' +
    '</form></div></body>';
  _loadPage(res, cookieMap, body, true);
}

/**
 * // TODO
 * @param {*} res 
 * @param {*} cookieMap 
 */
const editQAPage = (res, cookieMap) => {
  let qObj = getQ(cookieMap.get('quesid'), null);
  let body = '<body>';
  body += fs.readFileSync(EDIT_QA_A);
  body += qObj.question + '</h4>'; // close heading tag
  body += fs.readFileSync(EDIT_QA_B);
  body += '>' + qObj.answer + '</textarea>'; // close input tag
  body += fs.readFileSync(EDIT_QA_C);
  body += '>' + qObj.tags + '</textarea>'; // close input tag
  body += fs.readFileSync(EDIT_QA_D);
  _loadPage(res, cookieMap, body, true);
};

/**
 * Makes the HTML string representation of the login screen
 * dynamically
 * 
 * @param {string} uname the username of the user
 * @param {string} utype the type of user
 * @param {number} status login status code from constants
 * @returns {string} HTML represenation of login screen
 */
const loginPage = (uname, utype, status) => {
  let resMsg = _loginHeader(null, uname, utype, status);
  resMsg += _loginForm(uname || '');
  return resMsg += _footer(false);
};

/**
 * Handles generating the login response after the POST method
 * is called by the login form
 * 
 * @info SENDS RESPONSE BACK TO INCOMING CONNECTION
 * @param {ServerMessage} res ServerMessage to send back to incoming connection
 * @param {string} data query string from an `IncomingMessage` Object, parsed for params
 */
const loginResponse = (res, data) => {
  let params = qstring.parse(data);
  // check params
  let status = 0;
  console.log(params);
  if (varCheck(params.username)) {
    if (varCheck(params.password)) {
      if (varCheck(params.usertype)) {
        status = _login(
          params.username,
          params.password,
          params.usertype
        ); // only executes if all params are present
      } else {
        status = TYPE_MISMATCH;
      }
    } else {
      status = PASSWORD_MISMATCH;
    }
  } else {
    status = USER_NOT_FOUND;
  }
  // write response
  if (status == LOGIN_SUCCESSFUL) {
    res.writeHead(200, [
      ['Set-Cookie', 'uname=' + params.username],
      ['Set-Cookie', 'name=t'],
      ['Set-Cookie', 'utype=' + params.usertype],
      ['Set-Cookie', 'id=' + hashCode(params.password)]
    ]);
    let cm = new Map();
    cm.set('uname', params.username);
    cm.set('utype', params.usertype);
    qaPage(res, cm, '', '', '', '');
  } else {
    res.writeHead(401);
    res.end(loginPage(params.username, params.usertype, status));
  }
};

/**
 * Handles generating the logout response after the POST method
 * is called by the logout form
 * 
 * @info SENDS RESPONSE BACK TO INCOMING CONNECTION
 * @param {ServerMessage} res `ServerMessage` to send back to incoming connection
 * @param {Map<string, string>} cookieMap `Map` of cookies provided by the `IncomingMessage`
 */
const logoutResponse = (res, cookieMap) => {
  let header = _loginHeader(
    (cookieMap.get('name') == 't'),
    cookieMap.get('uname'),
    cookieMap.get('utype'),
    null
  );
  res.writeHead(200, [
    ['Set-Cookie', 'name=f'],
    ['Set-Cookie', 'id=0']
  ]);
  res.end(header + _loginForm(cookieMap.get('uname')) + _footer(false));
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

/**
 * Generates and sends the Q&A Search page
 * 
 * 
 * @info sends a response to the incoming connection
 * @warn DOES NOT SET RESPONSE HEAD
 * @param {ServerMessage} res response to send
 * @param {Map<string, string>} cookieMap cookies received
 * @param {string} auths string of comma delimited authors
 * @param {string} tags 
 * @param {string} start 
 * @param {string} end 
 */
const qaPage = (res, cookieMap, auths, tags, start, end) => {
  let body = '<body>';
  body += _searchBar(cookieMap.get('utype') != 'instructor');
  body += _qaList(auths, tags, start, end, cookieMap.get('utype') != 'instructor'); // generates with edit and delete buttons for instructors
  body += '</body>';
  _loadPage(res, cookieMap, body, true);
};

module.exports = {
  addQAPage,
  delQAPage,
  editQAPage,
  checkID,
  loginPage,
  loginResponse,
  logoutResponse,
  mapCookies,
  qaPage
};

/**
 * Constructs the footer for the webpages
 * 
 * @param {boolean} loggedIn signifies if the user making the request is logged in
 * @returns {string} html text representing the page footer;
 *  closes body, footer, and html tags
 */
const _footer = (loggedIn) => {
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
const _header = (uname, utype) => {
  // this method should always be called to start the `ServerMessage`
  // Assumes user is logged in
  let header = '<html><header style="margin: 3%;">'; // opens HTML tag, starts header
  header += '<h4>' + uname + ', ' + utype + '</h4>';
  return header + '</header><body>';
};

/**
 * Returns no blank page to user
 * 
 * @info sends a page to the user
 * @warn DOES NOT SET HEAD FOR RESPONSE
 * @param {ServerMessage} res 
 * @param {Map<string, string>} cookieMap 
 * @param {text} body HTML string
 * @param {boolean} footer 
 */
function _loadPage(res, cookieMap, body, footer) {
  body = body || '';
  res.end(_header(cookieMap.get('uname'), cookieMap.get('utype')) + body + _footer(footer));
}

/**
 * Logs in a user if login info matches
 * 
 * @param {string} uname the username to compare against
 * @param {string} pwd the password to compare against
 * @param {string} type the type of user
 * @returns {number} status code of the login (see constants.js for specific codes)
 */
const _login = (uname, pwd, type) => {
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
 * Builds the login page based on the username provided
 * 
 * @param {string} uname the username to add as a value to the Login form
 * @returns {string} well-formed HTML string representing a login page
 */
const _loginForm = (uname) => {
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
const _loginHeader = (loggedOut, uname, utype, status) => {
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
  switch (status) {
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
};

/**
 * Calculates the HTML div container which displays the information
 * contained in a qObj object
 * 
 * @warn ASSUMES qObj has properties `question`, `author`, `answer`, `tags`,
 * and `date`
 * @param {Object} qObj QA Object to pass to the function
 * @param {boolean} student `true` if edit and delete buttons should be omitted from HTML
 * @return {string} HTML container for a QA Object to display in the browser
 */
const _qa = (qObj, student) => {
  let text = '<div style="margin-top: 20; margin-left: 15%; margin-right: 15%;" ><div style="text-align: left;">'; // start container
  let ques = '<h4>' + qObj.question + '</h4>';
  if (student) {
    text += ques;
  } else {
    text += '<div style="display: grid; grid-auto-flow: column;">' + ques; // add question text
    text += '<form method="POST" action="" style="text-align: right; margin: auto 0 auto 0;"><input type="submit" name="edit" value="Edit" style="margin: 0 10 0 10;"/><input type="submit" name="delete" value="Delete" style="margin: 0 10 0 10;"/>'; // add buttons
    text += '<input type="hidden" name="id" value="' + qObj.id + '"/>'; // hide question id on page
    text += '</form></div>'; // close form and container
  }
  text += '<p style="color: gray;">' + qObj.answer + '</p></div>';
  text += '<div style="text-align: center;"><div style="color: darkgray; display: inline-block; padding-right: 20px;">' +
    '<label>author: ' + qObj.author + '</label></div>'; // answer
  text += '<div style="color: darkgray; display: inline-block; padding-right: 20px;">' +
    '<label>tags: ' + qObj.tags + '</label></div>'; // tags
  text += '<div style="color: darkgray; display: inline-block;">' +
    '<label>date: ' + qObj.date + '</label></div></div>'; // date
  return text + '</div>'; // close container
};

/**
 * Constructs HTML representation of the QA list returned from a search
 * 
 * @info HANDLES SEARCH
 * @param {string} auths string of comma delimited authors
 * @param {string} tags string of comma delimited tags
 * @param {string} start ISO Date string
 * @param {string} end ISO Date string
 * @returns {string} HTML text representation of a QAList to display
 */
const _qaList = (auths, tags, start, end, student) => {
  // get most recent list
  let arr = filterDatabase(auths, tags, start, end);
  // generate HTML
  let text = '<div stye="margin-left: 5%;">';
  arr.forEach((qObj) => {
    text += _qa(qObj, student);
  });
  return text + '</div>';
};

/**
 * Generates the HTML text for the search bar to display
 * 
 * @param {boolean} student `false` if the user is an instructor, otherwise `true`
 * @returns {string} HTML text
 */
const _searchBar = (student) => {
  let path = (student) ? SEARCH_BAR_STU : SEARCH_BAR_INST;
  return fs.readFileSync(path);
};