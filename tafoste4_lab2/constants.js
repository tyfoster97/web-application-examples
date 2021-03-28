module.exports = { 
  /* LOGIN MESSAGE CODES */
  LOGIN_SUCCESSFUL: 100,
  USER_NOT_FOUND: 101,
  PASSWORD_MISMATCH: 102,
  TYPE_MISMATCH: 103,
  /* FILE PATHS */
  QSTORE: __dirname + '/QA.json',
  USERSTORE: __dirname + '/data/Users.json',
  NUMSTORE: __dirname + '/data/ids.json',

  /* HTML DOCS */
  LOGINFORM_A: __dirname + '/forms/loginformA.html',
  LOGINFORM_B: __dirname + '/forms/loginformB.html',
  SEARCH_BAR_STU: __dirname + '/forms/search.html',
  SEARCH_BAR_INST: __dirname + '/forms/search_inst.html',
  LOGOUT_BUTTON: __dirname + '/forms/logoutbutton.html',
  TYPE_ERR_MSG: __dirname + '/forms/typematcherrmsg.html',
  PWD_ERR_MSG: __dirname + '/forms/passworderrmsg.html',
  USER_ERR_MSG: __dirname + '/forms/usererrmsg.html'
};