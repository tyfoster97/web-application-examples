/**
 * @file timer.js
 * @version 2021.04.10
 * @author Ty Foster
 * 
 * Handles user AFK timer
 */
let time = 0;
const timeout = 30;
/**
 * Represents a Timer that counts the number of seconds the 
 * user has been inactive.
 */
class Timer {
  /**
   * Checks the time on the timer
   */
  static check() {
    time++;
    console.log(time);
    if (time >= timeout) {
      alert(Dictionary.idleMsg());
      Timer.reset();
    }
  }
  /**
   * Resets the timer
   */
  static reset(t) {
    time = 0;
  }
}