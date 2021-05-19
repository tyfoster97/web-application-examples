const http = require('http');
const qstring = require('querystring');
const { LOGIN_SUCCESSFUL, USER_NOT_FOUND, PASSWORD_MISMATCH, TYPE_MISMATCH } = require('./constants');
const { mapCookies, buildLoginForm, login, buildLoginHeader, buildFooter, checkID, buildQAPage, loginPage, loginResponse, logoutResponse} = require('./util/server');
const { varCheck } = require('./util/util');
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
    if (req.method == 'POST') {
      // handle POST
      let reqData = '';
      req.on('data', (chunk) => {
        reqData += chunk;
      });
      req.on('end', () => {
        let params = qstring.parse(reqData);
        if (varCheck(params.logout)) {
          logoutResponse(res, cookieMap);
        } else {
          res.writeHead(500);
          buildQAPage(res, cookieMap, '', '', '', '');
        }
      });
    } else {
      // show Q&A Page
      res.writeHead(200);
      buildQAPage(res, cookieMap, '', '', '', '');
    }
  }
}).listen(3000);
