/**
 * @author Ty Foster
 * @version 2021.03.28
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains constants for the project
 */

module.exports = { 
  /* LOGIN MESSAGE CODES */
  LOGIN_SUCCESSFUL: 100,
  USER_NOT_FOUND: 101,
  PASSWORD_MISMATCH: 102,
  TYPE_MISMATCH: 103,
  /* FILE PATHS */
  QSTORE: __dirname + '/QA.json',
  NUMSTORE: __dirname + '/data/ids.json',
  USERSTORE: __dirname + '/data/Users.json',
  /* HTML DOCS */
  ADD_QA: __dirname + '/forms/add_qa.html',
  EDIT_QA_A: __dirname + '/forms/edit_qa_a.html',
  EDIT_QA_B: __dirname + '/forms/edit_qa_b.html',
  EDIT_QA_C: __dirname + '/forms/edit_qa_c.html',
  EDIT_QA_D: __dirname + '/forms/edit_qa_d.html',
  LOGINFORM_A: __dirname + '/forms/loginformA.html',
  LOGINFORM_B: __dirname + '/forms/loginformB.html',
  LOGOUT_BUTTON: __dirname + '/forms/logoutbutton.html',
  PWD_ERR_MSG: __dirname + '/forms/passworderrmsg.html',
  SEARCH_BAR_INST: __dirname + '/forms/search_inst.html',
  SEARCH_BAR_STU: __dirname + '/forms/search.html',
  TYPE_ERR_MSG: __dirname + '/forms/typematcherrmsg.html',
  USER_ERR_MSG: __dirname + '/forms/usererrmsg.html'
};