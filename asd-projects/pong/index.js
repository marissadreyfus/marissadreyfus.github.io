/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYCODES = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40,
    ENT: 13, //this is enter
  }
  
  // Game Item Objects
  function gameItem (id, leftOrRight) { 
    return {
      id: id,
      x: parseFloat($(id).css(leftOrRight)),
      y: parseFloat($(id).css('top')),
      speedX: 0, //this will not be used for the paddles, but I need it for the ball to move 
      speedY: 0,
      width: $(id).width(),
      height: $(id).height(),
    };
  }

  var p1 = gameItem('#leftPaddle', 'left');
  var p2 = gameItem('#rightPaddle', 'right');
  var ball = gameItem('#ball', 'left');

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    reposGameItem(p1);
    reposGameItem(p2);
    reposGameItem(ball);
    redraw(p1, 'left');
    redraw(p2, 'right');
    redraw(ball, 'left');
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEYCODES.W) {
      p1.speedY = -5;
    }
    if (event.which === KEYCODES.S) {
      p1.speedY = 5;
    }
    if (event.which === KEYCODES.UP) {
      p2.speedY = -5;
    }
    if (event.which === KEYCODES.DOWN) {
      p2.speedY = 5;
    }
  }

  function handleKeyUp (event) {
    if (event.which === KEYCODES.W || event.which || KEYCODES.S) {
      p1.speedY = 0;
    }
    if (event.which === KEYCODES.UP || event.which || KEYCODES.DOWN) {
      p2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function reposGameItem (obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }
  function redraw (obj, leftOrRight) {
    $(obj.id).css(leftOrRight, obj.x);
    $(obj.id).css('top', obj.y);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
