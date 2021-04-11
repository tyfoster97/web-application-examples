/**
 * @file activity2.js
 * @version 2021.04.09
 * @author Ty Foster
 * 
 * Contains functions for manipulating content on the single page application
 */

/**
 * Handles interpreting a user review
 */
function checkReview() {
  const comment = document.getElementById('user_comment');
  let text = comment.value;
  // check if text contains a JSON
  if (text.includes('{') || text.includes('}')) {
    // try to parse
    try {
      const obj = JSON.parse(text);
      if (Dictionary.addData(obj)) {
        alert('Word added to the dictionary and the dictionary is smarter');
      } else {
        alert('Could not find the proper key and the dictionary stays dumb');
      }
    } catch (err) {
      alert('Invalid JSON! Please enter a valid JSON!');
    }
  } else {
    const arr = text.split(/\s+/);
    Dictionary.censor(arr);
    comment.value = arr.join(' ');
  }
}

/**
 * Handles initial page setup after the body loads
 */
function setup() {
  document.getElementById('btn_uname').onclick = submitName;
  _checkUser();
  const timer = new Timer(30); // 30s afk timeout
  window.setInterval(Timer.check, 1000);
  document.onclick = Timer.reset;
  document.onkeypress = Timer.reset;
  document.onmousemove = Timer.reset;
}

/**
 * Handles submit button press on username form
 */
function submitName() {
  const uname = document.getElementById('u_name').value; // get username
  document.cookie = "uname=" + uname + "; SameSite=Lax; Max-Age=86400;"; // save username as cookie
  _welcomeMsg(uname);
}

/**
 * Determines if the user has already registered with the service
 */
function _checkUser() {
  let uname;
  try {
    // get username from cookies
    uname = document.cookie
      .split(/;/)
      .find(row => row.startsWith('uname='))
      .split('=')[1];
  } catch (err) {
    uname = undefined; // no username cookie
  }
  if (uname) { // null check to prevent error state
    document.getElementById('u_name').value = uname;
    _welcomeMsg(uname);
    alert(`Welcome back ${uname}`);
  }
}

/**
 * Appends the reviews section to the body of the page
 * 
 * @param div the div for the review section
 */
function _reviews(div) {
  // make heading
  const h3 = document.createElement('h3');
  const h3Text = document.createTextNode(
    'Fifth Element critic reviews'
  );
  h3.appendChild(h3Text);
  // add heading to div
  div.appendChild(h3);

  // make reviews
  const p = document.createElement('p');
  let pText = document.createTextNode(
    'An entertaining tangle of pop aesthetic and comic book myth that occasionally bogs down, but manages to be ingratiating for all its defects. - Washington Post'
  );
  p.appendChild(pText);
  p.appendChild(document.createElement('br')); // for formatting
  pText = document.createTextNode(
    'As a yammering, swishy talk show host, Chris Tucker is flat-out incomprehensible, while Mr. Oldman preens evilly enough to leave tooth marks on the scenery. - New York Times'
  );
  p.appendChild(pText);
  p.appendChild(document.createElement('br')); // for formatting
  pText = document.createTextNode(
    'It may or may not be the worst movie ever made, but it is one of the most unhinged. - Slate'
  );
  p.appendChild(pText);
  // add reviews to div
  div.appendChild(p);

  // make user input section
  const form = document.createElement('form');
  form.action = '#';
  //make label
  const label = document.createElement('label');
  label.for = 'user_comment';
  label.innerHTML = 'Please give your comments: ';
  // add label to form
  form.appendChild(label);
  // make textarea
  const textarea = document.createElement('textarea');
  textarea.name = 'user_comment';
  textarea.id = 'user_comment';
  textarea.rows = '10';
  textarea.cols = '60';
  textarea.style.maxWidth = '99%';
  // add textarea to form
  form.appendChild(textarea);
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Submit Review';
  button.onclick = checkReview; // handle event
  // add button to form
  form.appendChild(button);
  // add form to div
  div.appendChild(form)
}

/**
 * Appends the welcome message to the page
 * 
 * @param {string} uname the user's name
 */
function _welcomeMsg(uname) {
  try {
    document.getElementById('reviews').remove();
  } catch (err) {
    //do nothing
  }
  const div = document.createElement('div');
  div.id = 'reviews';
  const p = document.createElement('p'); // make element node
  const msg = document.createTextNode(
    `${uname} Welcome to the movie review System! Please enter your comments about the movie`
  ); // make the text node
  p.appendChild(msg); // set up element for appending to body
  div.appendChild(p); // display on page
  document.body.appendChild(div);
  _reviews(div); // display rerviews
}
