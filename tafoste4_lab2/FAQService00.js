const http = require('http');
const qstring = require('querystring');
const { LOGIN_SUCCESSFUL, USER_NOT_FOUND, PASSWORD_MISMATCH, TYPE_MISMATCH } = require('./constants');
const { mapCookies, buildLoginForm, login } = require('./util/server');
/* for simplicity */
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
  let cookieMap = mapCookies(cookies);
  if (req.method == 'GET') {
    res.writeHead(200);
    let resBody = '';
    // TODO display welcome message if uname cookie is detected -> use helper method to build into resBody
    if (cookieMap.has('login') && cookieMap.get('login') == 'true') {
      // TODO display Q&A page
      resBody += 'hello';
    } else {
      if (cookieMap.has('uname')) {
        // TODO generate page header with welcome message
        resBody += buildLoginForm(cookieMap.get('uname'));
      } else {
        resBody += buildLoginForm('');
      }
    }
    res.end(resBody + pgFoot);
  } else if (req.method == 'POST') {
    // read in request
    let reqData = '';
    req.on('data', (chunk) => {
      reqData += chunk;
    });
    req.on('end', () => {
      let params = qstring.parse(reqData);
      // TODO determine page calling POST
      if (params.username && params.password) {
        // TODO verify login
        switch(login(params.username, params.password, params.usertype)) {
          case LOGIN_SUCCESSFUL:
            // TODO handle successful login
            res.writeHead(200, [
              ['Set-Cookie', 'uname=' + params.username],
              ['Set-Cookie', 'login=true'],
              ['Set-Cookie', 'utype=' + params.usertype]
            ]);
            res.end(util.pgHead(params.username, params.usertype, false) + 'logged in' + pgFoot);
            break;
          case USER_NOT_FOUND:
            // TODO
            res.setHeader(401);
            break;
          case PASSWORD_MISMATCH:
            // TODO
            break;
          case TYPE_MISMATCH:
            // TODO
            break;
          default:
            res.setHeader(500); // Something has to go very wrong for this to happen
            break;
        }
        // TODO send response
      } // TODO handle other pages
    });
  }
}).listen(3000);