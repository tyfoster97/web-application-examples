/**
 * @file activity3.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Contains functions for manipulating content on the single page application
 */

/**
 * Handles initial page setup
 */
function setup() {
  // add onclick listener to submit name button
  document.getElementById('btn_uname').onclick = submitName;
  // check if user has previously logged in
  _hasVisited();
  // set timeout
  window.setTimeout(_idleMsg, 30 * 1000); // 30s timeout
}

/**
 * Handles submitting a content from the text area
 */
function submitComment() {

}

/**
 * Handles submitting the username
 */
function submitName() {
  const uname = document.getElementById('u_name').value; // get
  window.localStorage.setItem('uname', uname); // store
  _welcomeMsg(uname); // display welcome message
}

/**
 * Adds user comments to the comments section
 * 
 * @param p the paragraph element containing the reviews
 */
function _addUserComments(p) {

}

/**
 * Determines if the user has visited and handles
 * restoring the previous state for the user
 */
function _hasVisited() {

}

/**
 * Handles displaying an idle message to the user
 */
function _idleMsg() {

}

const heading = 'Fifth Element critic reviews';
const rev1 = 'An entertaining tangle of pop aesthetic and comic book myth that occasionally bogs down, but manages to be ingratiating for all its defects. - Washington Post';
const rev2 = 'As a yammering, swishy talk show host, Chris Tucker is flat-out incomprehensible, while Mr. Oldman preens evilly enough to leave tooth marks on the scenery. - New York Times';
const rev3 = 'It may or may not be the worst movie ever made, but it is one of the most unhinged. - Slate';
const ta_id = 'user_comment';
/**
 * Handles displaying the review section
 * 
 * @param div the div for the review section
 */
function _reviewSection(div) {
  // make heading nodes
  const h3 = document.createElement('h3');
  const h3_text = document.createTextNode(heading);
  
  // make review nodes
  const p = document.createElement('p');
  // review 1
  let p_text = document.createTextNode(rev1);
  p.appendChild(p_text);
  const br = document.createElement('br');
  p.appendChild(br);
  // review 2
  p_text = document.createTextNode(rev2);
  p.appendChild(p_text);
  const br = document.createElement('br');
  p.appendChild(br);
  // review 3
  p_text = document.createTextNode(rev3);
  p.appendChild(p_text);
  const br = document.createElement('br');
  p.appendChild(br);
  //TODO _addUserComments(p);
  
  // make user input section
  const form = document.createElement('form');
  const label = document.createElement('label');
  label.for = ta_id;
  label.innerHTML = 'Please give your comments: ';
  const textarea = document.createElement('textarea');
  textarea.name = ta_id;
  textarea.id = ta_id;
  textarea.rows = '10';
  textarea.cols = '60';
  textarea.style.maxWidth = '100%';
  const btn = document.createElement('input');
  btn.type = 'button';
  btn.value = 'Submit Review';
  btn.onclick = submitComment;
  form.appendChild(label);
  form.appendChild(textarea);
  form.appendChild(btn);

  // append nodes
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(form);
}

const rev_id = 'reviews'; // for refactorability
/**
 * Handles displaying the welcome message to the user
 * 
 * @param uname the user's name
 */
function _welcomeMsg(uname) {
  // remove div if it exists on the page
  try {
    document.getElementById(rev_id).remove();
  } catch (err) {
    // do nothing
  }
  // make div
  const div = document.createElement('div');
  div.id = rev_id;
  // make message nodes
  const p = document.createElement('p');
  const msg = document.createTextNode(
    `${uname} Welcome to the movie review System! Please enter your comments about the movie`
  );
  // append nodes
  p.appendChild(msg);
  div.appendChild(p);
  document.body.appendChild(div);
  // display reviews section
  _reviewSection(div);
}