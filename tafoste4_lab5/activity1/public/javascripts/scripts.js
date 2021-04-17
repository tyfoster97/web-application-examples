/*******************************************************************************
 * @file scripts.js
 * @version 2021.04.15
 * @author Ty Foster
 * SER 421, Arizona State University
 * Copyright 2021, All rights reserved.
 *
 * This file contains methods for the Single Page Application
 */

setup(); // handle page set up

/***********************************************************
 * Handles adding event handlers to DOM Elements as well as
 * other page setup
 */
function setup() {
  _disableBtn('euro_btn', true);
  _disableBtn('pound_btn', true);
  // Amount input
  const amt_in = document.getElementById('amount');
  amt_in.addEventListener('input', function () {
    _disableBtn('euro_btn', false);
    _disableBtn('pound_btn', false);
  });
  // Euro button
  const eu_btn = document.getElementById('euro_btn');
  eu_btn.addEventListener('click', async function () {
    await ajaxRequest('/euro', methods.POST);
  });
  // Pound button
  const uk_btn = document.getElementById('pound_btn');
  uk_btn.addEventListener('click', async function () {
    await ajaxRequest('/pound', methods.POST);
  });
  // Pop button
  const pop_btn = document.getElementById('pop_btn');
  pop_btn.addEventListener('click', async function () {
    await ajaxRequest('/pop', methods.GET, currencies.EU);
  });
  // Reset button
  const reset_btn = document.getElementById('reset_btn');
  reset_btn.disabled = true; //FIX enable when stack has elements
  reset_btn.addEventListener('click', async function () {
    await ajaxRequest('/reset', methods.GET, currencies.EU);
  });
  // History button
  const history_btn = document.getElementById('history_btn');
  history_btn.addEventListener('click', async function () {
    await ajaxRequest('/history', methods.GET, currencies.EU);
  });
}

/***********************************************************
 * Checks if the amount entered in the input field is a
 * valid input, displays an alert if the input is invalid
 */
function _disableBtn(id, disabled) {
  document.getElementById(id).disabled = disabled;
}

/***********************************************************
   * Converts an Operation to a String
   *
   * @param {Operation} op the operation object to convert
   */
function _opToString(op) {
  return `Operand: ${op.operand.amount} was converted from ${op.operand.type} to ${op.result.amount} ${op.result.type}, IP: ${op.ip}, User-Details: ${op.agent}`;
}
