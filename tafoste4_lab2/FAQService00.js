const http = require('http');
const qstring = require('querystring');
const { LOGIN_SUCCESSFUL, USER_NOT_FOUND, PASSWORD_MISMATCH, TYPE_MISMATCH } = require('./constants');
const { mapCookies, buildLoginForm, buildHeader, ldpg, login, buildLoginHeader, buildFooter, checkID, buildQAPage } = require('./util/server');
const { hashCode, varCheck } = require('./util/util');
/* for simplicity */
const pgFoot = '</html></body>';
/**
 * @author Ty Foster
 * @version 2021.03.25
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 */

http.createServer(function (req, res) {
  // check for cookies, make cookieMap
  let cookieMap = (varCheck(req.headers.cookie)) ? mapCookies(req.headers.cookie.split(/;\s+/)) : new Map();
  if (!checkID(cookieMap.get('id'))) {
    if (req.method == 'POST') {
      // get request data
      let loginData = '';
      req.on('data', (chunk) => {
        loginData += chunk;
      });
      req.on('end', () => {
        loginResponse(res, loginData);
      });
    } else {
      res.writeHead(200);
      res.end(loginPage(cookieMap.get('uname'), cookieMap.get('utype'), null));
    }
  } else {
    // handle logged in user
    if (req.method == 'POST') {
      // handle POST
      let reqData = '';
      req.on('data', (chunk) => {
        reqData += chunk;
      });
      req.on('end', () => {
        let params = qstring.parse(reqData);
        if (varCheck(params.search)){
          buildQAPage(res, cookieMap, params.author, params.tags, params.startdate, params.enddate);
        } 
        else if (varCheck(params.edit)) {
          // TODO show edit QA page
        }
        else if (varCheck(params.save)) {
          // TODO modify the QA in db
        }
        else if (varCheck(params.cancel)) {
          // TODO abort changes, return to search
        }
        else if (varCheck(params.logout)) {
          //handle logout
          logoutResponse(res, cookieMap);
        } else {

        }
        console.log(params);
        //TODO handle database search
        //TODO handle database edit
      });
    } else {
      res.writeHead(200);
      buildQAPage(res, cookieMap, '', '', '', '');
    }
  }
}).listen(3000);

/**
 * Makes the HTML string representation of the login screen
 * dynamically
 * 
 * @param {string} uname the username of the user
 * @param {string} utype the type of user
 * @param {number} status login status code from constants
 * @returns {string} HTML represenation of login screen
 */
function loginPage(uname, utype, status) {
  let resMsg = buildLoginHeader(null, uname, utype, status);
  resMsg += buildLoginForm(uname || '');
  return resMsg += buildFooter(false);
}

/**
 * Handles generating the login response after the POST method
 * is called by the login form
 * 
 * @info SENDS RESPONSE BACK TO INCOMING CONNECTION
 * @param {ServerMessage} res ServerMessage to send back to incoming connection
 * @param {string} data query string from an `IncomingMessage` Object, parsed for params
 */
function loginResponse(res, data) {
  let params = qstring.parse(data);
  // check params
  let status = 0;
  console.log(params);
  if (varCheck(params.username)) {
    if (varCheck(params.password)) {
      if (varCheck(params.usertype)) {
        status = login(
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
    buildQAPage(res, cm, '', '', '', '');
  } else {
    res.writeHead(401);
    res.end(loginPage(params.username, params.usertype, status));
  }
}

/**
 * Handles generating the logout response after the POST method
 * is called by the logout form
 * 
 * @info SENDS RESPONSE BACK TO INCOMING CONNECTION
 * @param {ServerMessage} res `ServerMessage` to send back to incoming connection
 * @param {Map<string, string>} cookieMap `Map` of cookies provided by the `IncomingMessage`
 */
function logoutResponse(res, cookieMap) {
  let header = buildLoginHeader(
    (cookieMap.get('name') == 't'),
    cookieMap.get('uname'),
    cookieMap.get('utype'),
    null
  );
  res.writeHead(200, [
    ['Set-Cookie', 'name=f'],
    ['Set-Cookie', 'id=0']
  ]);
  res.end(header + buildLoginForm(cookieMap.get('uname')) + buildFooter(false));
}