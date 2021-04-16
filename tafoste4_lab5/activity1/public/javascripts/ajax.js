/*******************************************************************************
 * @file ajax.js
 * @version 2021.04.15
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 * 
 * This file contains methods for making and processing AJAX calls to the server
 */

/*****************************
 * REST API method constants
 */
const methods = {
  GET: 'GET',
  POST: 'POST'
}

/*****************************
 * Currency constants
 * 
 * @property {string} EU 
 * corresponds to EURO
 * @property {string} UK 
 * corresponds to POUND
 * @property {string} US 
 * corresponds to USD
 */
const currencies = {
  EU: 'EURO',
  UK: 'POUND',
  US: 'USD'
};

/***********************************************************
 * Handles an AJAX Reuqest to the Server
 * 
 * @param {string} address the address for the HTTP request
 * @param {string} methodType the REST API method type
 */
function ajaxRequest(address, methodType, currency) {
  //TODO
}


/***********************************************************
 * Obtains an XML HTTP Request Object
 * 
 * @returns the XMLHttpRequest Object
 */
function _getRequest() {
  //TODO
}

/***********************************************************
 * Handles displaying the result of a conversion to the
 * Single Page Application
 * 
 * @param {string} currency_type the currency type
 * @param {number} amount the converted amount
 */
function _processConversion(currency_type, amount) {
  //TODO
}

/***********************************************************
 * Handles displaying the history of commands for the
 * Single Page Application
 * 
 * @param {Array} stack the stack of commands
 */
function _processHistory(stack) {
  //TODO
}

/***********************************************************
 * Handles popping an element off of the stack of commands
 * issued in the Single Page Application
 * 
 * @param {Array} stack the stack of commands
 */
function _processPop(stack) {
  //TODO
}
