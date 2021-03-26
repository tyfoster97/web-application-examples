/* LOGIN MESSAGE CODES */
const LOGIN_SUCCESSFUL = 100;
const USER_NOT_FOUND = 101;
const PASSWORD_MISMATCH = 102;
const TYPE_MISMATCH = 103;


/* FILE PATHS */
const QSTORE = __dirname + 'data/QA.json';
const USERSTORE = __dirname + 'data/Users.json';
const LOGINFORM_A = __dirname + 'forms/loginformA.html';
const LOGINFORM_B = __dirname + 'forms/loginformB.html';

module.exports = { 
  LOGIN_SUCCESSFUL, USER_NOT_FOUND, PASSWORD_MISMATCH, TYPE_MISMATCH,
  QSTORE, USERSTORE, LOGINFORM_A, LOGINFORM_B
};