const http = require('http');
const util = require('./util');
const qstring = require('querystring');
const fs = require('fs');
const { LOGIN_SUCCESSFUL, USER_NOT_FOUND, PASSWORD_MISMATCH, 
  TYPE_MISMATCH, LOGINFORM_A , LOGINFORM_B 
} = require('./constants');
/* for simplicity */
const pgHead = '<html><body>';
const pgFoot = '</html></body>';
/**
 * @author Ty Foster
 * @version 2021.03.25
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 */

const loginA = 

http.createServer(function (req, res) {
  // get cookies from header
  let cookies = req.headers.cookie.split(/;\s+/);
  let cookieMap = util.mapCookies(cookies);
  if (req.method == 'GET') {
    res.writeHead(200);
    let resBody = '';
    if (cookieMap.has('login') && cookieMap.get('login') == 'true') {
      // TODO: display Q&A page
    } else {
      if (cookieMap.has('uname')) {
        resBody += util.buildLoginForm(cookieMap.get('uname'));
      } else {
        resBody += util.buildLoginForm('');
      }
    }
    res.end(pgHead + resBody + pgFoot);
  } else if (req.method == 'POST') {
    // TODO: get postParams

    // TODO: determine if login POST or database POST
  }
}).listen(3000);