const heading = 'Fifth Element critic reviews';
const rev1 = 'An entertaining tangle of pop aesthetic and comic book myth that occasionally bogs down, but manages to be ingratiating for all its defects. - Washington Post';
const rev2 = 'As a yammering, swishy talk show host, Chris Tucker is flat-out incomprehensible, while Mr. Oldman preens evilly enough to leave tooth marks on the scenery. - New York Times';
const rev3 = 'It may or may not be the worst movie ever made, but it is one of the most unhinged. - Slate';
const res_id = 'response';
const rev_id = 'reviews';
const ta_id = 'user_comment';
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
  // set afk timer
  window.setInterval(Timer.check, 1000);
  document.onclick = Timer.reset;
  document.onkeypress = Timer.reset;
  document.onmousemove = Timer.reset;
}

/**
 * Handles submitting a content from the text area
 */
function submitComment() {
  const ta = document.getElementById(ta_id);
  let comment = ta.value;
  if (comment.includes('{') || comment.includes('}')) {
    // handle JSON Object
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
    const arr = comment.split(/\s+/);
    if (arr[0].startsWith('/')) {
      _welcomeMsg(localStorage.getItem('uname')); // redraw review section
      // handle command
      switch(arr[0]) {
        case '/clear':
          clear();
          break;
        case '/count':
          count();
          break;
        case '/history':
          history();
          break;
        case '/list':
          list();
          break;
        case '/search':
          if (arr[1]) {
            search(arr[1]);
          } else {
            alert('Please enter a word to search');
          }
          break;
        default: 
          alert('The command you entered is not valid, valid commands are:\n /search <word>, /clear, /history, /count, and /list');
          break;
      }
    } else {
      // handle review
      Dictionary.censor(arr);
      const censored_comment = arr.join(' ');
      // save uncensored reviews to session
      const actual = JSON.parse(sessionStorage.getItem('actual') || '[]');
      actual.push(comment);
      sessionStorage.setItem('actual', JSON.stringify(actual));
      // save censored to session and local
      const session_comments = JSON.parse(sessionStorage.getItem('comments') || '[]');
      session_comments.push(censored_comment);
      sessionStorage.setItem('comments', JSON.stringify(session_comments));
      const local_comments = JSON.parse(localStorage.getItem('comments') || '[]');
      local_comments.push(`${censored_comment} - ${localStorage.getItem('uname')}`);
      localStorage.setItem('comments', JSON.stringify(local_comments));
      // re-render reviews section
      _welcomeMsg(localStorage.getItem('uname'));
      document.getElementById(ta_id).value = censored_comment;
    }
  }
}

/**
 * Handles submitting the username
 */
function submitName() {
  const uname = document.getElementById('u_name').value; // get
  localStorage.setItem('uname', uname); // store
  _welcomeMsg(uname); // display welcome message
}

/**
 * Adds user comments to the comments section
 * 
 * @param p the paragraph element containing the reviews
 */
function _addUserComments(p) {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  // load user comments on page
  for (comment of comments) {
    p.appendChild(document.createTextNode(comment));
    p.appendChild(_br());
  }
}

/**
 * Creates a line break HTML Element
 * 
 * @returns a break HTMLElement
 */
function _br() {
  return document.createElement('br');
}

/**
 * Determines if the user has visited and handles
 * restoring the previous state for the user
 */
function _hasVisited() {
  let uname;
  uname = localStorage.getItem('uname');
  if (uname) {
    document.getElementById('u_name').value = uname;
    _welcomeMsg(uname);
    alert(`Welcome back ${uname}`);
    let d = JSON.parse(localStorage.getItem('dict'));
    if (d) {
      //TODO have dictionary save to local storage when ameliorated
      dict.entries = d.entries; // substitute entries
    }
  }
}

/**
 * Handles displaying the review section
 * 
 * @param div the div for the review section
 */
function _reviewSection(div) {
  // make heading nodes
  const h3 = document.createElement('h3');
  const h3_text = document.createTextNode(heading);
  h3.appendChild(h3_text);

  // make review nodes
  const p = document.createElement('p');
  // review 1
  let p_text = document.createTextNode(rev1);
  p.appendChild(p_text);
  p.appendChild(_br());
  // review 2
  p_text = document.createTextNode(rev2);
  p.appendChild(p_text);
  p.appendChild(_br());
  // review 3
  p_text = document.createTextNode(rev3);
  p.appendChild(p_text);
  p.appendChild(_br());
  _addUserComments(p);

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
  textarea.required;
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