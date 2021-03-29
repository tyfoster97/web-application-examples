const http = require('http');
const qstring = require('querystring');
const { addQuestion, updateQuestion, deleteQuestion } = require('./FAQ');
const { mapCookies, checkID, logoutResponse, loginPage, loginResponse, qaPage, addQAPage, editQAPage, delQAPage } = require('./util/server');
const { varCheck } = require('./util/util');
/**
 * @author Ty Foster
 * @version 2021.03.28
 * SER 421, Arizona State University
 * Copyright 2021, all rights reserved.
 *
 * Host an FAQ Service server
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
        if (varCheck(params.add)) {
          // load add question page
          res.writeHead(200, {
            'Set-Cookie': 'page=addques'
          });
          addQAPage(res, cookieMap);
        }
        else if (varCheck(params.addques)) {
          // add question
          // INFO params.auth and params.ans validated by HTML form
          addQuestion(params.ques, params.ans, cookieMap.get('uname'), params.tags);
          // send to search page
          res.writeHead(300, {
            'Set-Cookie': 'page=search'
          });
          qaPage(res, cookieMap);
        }
        else if (varCheck(params.edit)) {
          // set response headers
          res.writeHead(200, [
            ['Set-Cookie', 'page=editques'],
            ['Set-Cookie', 'quesid=' + params.id]
          ]);
          cookieMap.set('quesid', params.id);
          editQAPage(res, cookieMap); // display edit page
        }
        else if (varCheck(params.save)) {
          // modify the QA in db
          updateQuestion(cookieMap.get('quesid'), params.ques, params.ans, cookieMap.get('uname'), params.tags);
          // set response head
          res.writeHead(200, [
            ['Set-Cookie', 'page=search'],
            ['Set-Cookie', 'quesid=']
          ]);
          // display search page
          qaPage(res, cookieMap, '', '', '', '', '');
        }
        else if (varCheck(params.delete)) {
          // set response headers
          res.writeHead(200, [
            ['Set-Cookie', 'page=delques'],
            ['Set-Cookie', 'quesid=' + params.id]
          ]);
          cookieMap.set('quesid', params.id);
          delQAPage(res, cookieMap); // display delete confirmation page
        }
        else if (varCheck(params.confirmdel)) {
          // delete from database
          deleteQuestion(cookieMap.get('quesid'), null);
          // send to search page
          res.writeHead(200, [
            ['Set-Cookie', 'page=search'],
            ['Set-Cookie', 'quesid=']
          ]);
          qaPage(res, cookieMap, '', '', '', '');
        }
        else if (varCheck(params.logout)) {
          //handle logout
          logoutResponse(res, cookieMap);
        }
        else {
          res.writeHead(200, {
            'Set-Cookie': 'page=search'
          });
          qaPage(res, cookieMap, params.srchauthor, params.srchtags, params.startdate, params.enddate);
        }
      });
    } else {
      switch(cookieMap.get('page')) {
        case 'addques':
          res.writeHead(200);
          addQAPage(res, cookieMap);
          break;
        case 'editques':
          res.writeHead(200);
          editQAPage(res, cookieMap);
          break;
        case 'delques':
          res.writeHead(200);
          delQAPage(res, cookieMap);
          break;
        case 'search':
          res.writeHead(200);
          qaPage(res, cookieMap, '', '', '', '');
          break;
        default:
          res.writeHead(404);
          qaPage(res, cookieMap, '', '', '', '');
      }
    }
  }
}).listen(3000);
