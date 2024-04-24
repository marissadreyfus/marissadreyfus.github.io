/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $('#board').height();
  var KEYCODES = {
    W: 87,
    S: 83,
    UP: 38,
    DOWN: 40,
    ENT: 13, //this is enter
    SPACE: 32,
  }
  
  // Game Item Objects
  function gameItem (id) { 
    return {
      id: id,
      x: parseFloat($(id).css('left')),
      y: parseFloat($(id).css('top')),
      speedX: 0, //this will not be used for the paddles, but I need it for the ball to move 
      speedY: 0,
      width: $(id).width(),
      height: $(id).height(),
    };
  }

  var p1 = gameItem('#leftPaddle');
  var p2 = gameItem('#rightPaddle');
  var ball = gameItem('#ball');
  var start = false;

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
    startGameText();
    reposGameItem(p1);
    reposGameItem(p2);
    reposGameItem(ball);
    redraw(p1);
    redraw(p2);
    redraw(ball);
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
    if (event.which === KEYCODES.SPACE && ball.speedX === 0 && ball.speedY === 0) {
      ball.speedX = Math.random() > 0.5 ? -5 : 5;
      ball.speedY = Math.random() > 0.5 ? -5 : 5;
      start = true;
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
  function redraw (obj) {
    $(obj.id).css('left', obj.x);
    $(obj.id).css('top', obj.y);
  }

  function startGameText () {
    if (start === false) {
      $('#startText').text('Press SPACE to start.');
      $('#startText').css("left", BOARD_WIDTH / 2 - $('#startText').width() / 2);
    }
    if (start === true) {
      $("#startText").hide();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    start = false;
  }

}
