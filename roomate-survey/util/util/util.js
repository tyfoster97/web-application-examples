const createError = require("http-errors");
/**
 * @author Ty Foster
 * @version 2021.04.01
 * 
 * Copyright 2021, all rights reserved.
 * 
 * Contains generic utility functions 
 */

/**
 * Renders HTTP Error page for user
 * 
 * @param {number} code the HTTP error code to send
 * @param {Request} req the HTTP Request from the client
 * @param {Response} res the HTTP Response from the server
 * @param {import("express").NextFunction} next the NextFunction callback for express
 */
 function httpErr(code, req, res, next) {
  let err = createError(code);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

/**
 * Checks if a variable is defined
 * 
 * @param {any} v variable to check
 * @returns {boolean} `false` if `v` is `undefined` or `null`,
 * otherwise `true`
 */
function isVar(v) {
  let isvar = true;
  if (v === null || v === undefined) {
    isvar = false;
  }
  return isvar;
}

module.exports = {
  httpErr,
  isVar
};
