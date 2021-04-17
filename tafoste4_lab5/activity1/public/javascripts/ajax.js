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

/***********************************************************
 * Opens an AJAX Reuqest to the Server
 *
 * @param {string} address the address for the HTTP request
 * @param {string} methodType the REST API method type
 */
async function ajaxRequest(address, methodType) {
  const request = await _getRequest(); // can return null
  if (request) {
    request.onreadystatechange = function () { _handle(request); };
    const amt = document.getElementById('amount').value;
    if (methodType == 'POST' && !isNaN(amt)) {
      address += `?amount=${amt}`;
      console.log(address);
      _openRequest(request, methodType, address);
    } else if (isNaN(amt)) {
      alert('Please enter a number');
    } else {
      _openRequest(request, methodType, address);
    }
  } else {
    console.error('Error: ajaxRequest could not obtain the XMLHttpRequest');
  }
}


/***********************************************************
 * Handles an XML HTTP Request on status change
 *
 * @param {XMLHttpRequest} request the request
 */
async function _handle(request) {
  if (request.readyState == 4) {
    if (request.status == 200) {
      const data = JSON.parse(request.responseText);
      switch(data.op) {
        case 'euro': // same response as euro
        case 'pound': // see above
          // fill answer
          _showConversion(data.currency, data.amount);
        case 'history': // need to fill history
          // fill history
          _showHistory(data.stack);
          break;
        case 'pop': // same response as reset
        case 'reset':
          _processPop(data);
          break;
      }
    } else {
      console.log(`status: ${request.status}`)
    }
  }
}

/***********************************************************
 * Obtains an XML HTTP Request Object
 *
 * @returns the XMLHttpRequest Object
 */
async function _getRequest() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } else {
    return null;
  }
}

/***********************************************************
 * Opens and sends a request to the server
 *
 * @param {XMLHttpRequest} request the XML HTTP Request
 * @param {string} methodType the REST API method
 * @param {string} address the uri for the resource
 */
function _openRequest(request, methodType, address) {
  request.open(methodType, address, true);
  request.send();
}

/***********************************************************
 * Handles changing the page display after a Pop request
 *
 * @param {Object} data the data from the response
 */
function _processPop(data) {
  const op = data.popped;
  op.operand = op.operand || {amount: 0};
  op.result = op.result || {type: 'USD', amount: 0};
  document.getElementById('amount').value = op.operand.amount
  _showConversion(op.result.type, op.result.amount);
  _showHistory(data.stack);
}

/***********************************************************
 * Handles displaying the result of a conversion to the
 * Single Page Application
 *
 * @param {string} currency_type the currency type
 * @param {number} amount the converted amount
 */
function _showConversion(currency, amount) {
  const result = document.getElementById('result');
  result.innerHTML = `Currency value is: ${amount} in ${currency}`;
}

/***********************************************************
 * Handles displaying the history of commands for the
 * Single Page Application
 *
 * @param {Array<Object>} stack the stack of commands
 */
function _showHistory(stack) {
  const section = document.getElementById('history');
  if (section.hasChildNodes()) {
    section.removeChild(document.getElementById('stack'));
  }
  const p = document.createElement('p');
  p.id = 'stack';
  for (item of stack) {
    const text = document.createTextNode(_opToString(item));
    p.appendChild(text);
    p.appendChild(document.createElement('br'));
  }
  section.appendChild(p);
  if (stack === []) {
    _disableBtn('reset_btn', true);
  } else {
    _disableBtn('reset_btn', false); // enable button
  }
}
