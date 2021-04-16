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
 * Opens an AJAX Reuqest to the Server
 * 
 * @param {string} address the address for the HTTP request
 * @param {string} methodType the REST API method type
 * @param {string} currency (Optional) the currency type
 */
function ajaxRequest(address, methodType, currency) {
  const request = _getRequest(); // can return null
  if (request) {
    request.onreadystatechange = function () { _handle(request); };
    const amt = Number(document.getElementById('amount').innerText);
    if (!isNaN(amt)) {
      if (
        currency == currencies.EU ||
        currency == currencies.UK ||
        currency == currencies.US
      ) {
        address += `?currencies=?${currrency}&amount=${amt}`;
      } else {
        alert(`${currency} is not a supported currency`);
      }
    } else {
      alert(`Please enter a number`);
    }
    request.open(methodType, address, true);
    request.send(null);
  } else {
    console.error('Error: ajaxRequest could not obtain the XMLHttpRequest');
  }
}


/***********************************************************
 * Handles an XML HTTP Request on status change
 * 
 * @param {XMLHttpRequest} request the request
 */
function _handle(request) {
  //TODO
}


/***********************************************************
 * Obtains an XML HTTP Request Object
 * 
 * @returns the XMLHttpRequest Object
 */
function _getRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

/***********************************************************
 * Handles changing the page display after a Pop request
 * 
 * @param {Array<Object>} stack the stack of commands
 */
function _processPop(stack) {
  //TODO
}

/***********************************************************
 * Handles displaying the result of a conversion to the
 * Single Page Application
 * 
 * @param {string} currency_type the currency type
 * @param {number} amount the converted amount
 */
function _showConversion(currency_type, amount) {
  //TODO
}

/***********************************************************
 * Handles displaying the history of commands for the
 * Single Page Application
 * 
 * @param {Array<Object>} stack the stack of commands
 */
function _showHistory(stack) {
  //TODO
}
