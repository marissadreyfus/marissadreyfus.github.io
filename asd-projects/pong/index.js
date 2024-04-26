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

  // game variables
  var start = false;
  var p1Score = 0;
  var p2Score = 0;

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
    gameText();
    scoring();
    reposGameItem(p1);
    reposGameItem(p2);
    reposGameItem(ball);
    redraw(p1);
    redraw(p2);
    redraw(ball);
    boundPlayers(p1);
    boundPlayers(p2);
    boundBalls(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEYCODES.W && start === true) {
      p1.speedY = -10;
    }
    if (event.which === KEYCODES.S && start === true) {
      p1.speedY = 10;
    }
    if (event.which === KEYCODES.UP && start === true) {
      p2.speedY = -10;
    }
    if (event.which === KEYCODES.DOWN && start === true) {
      p2.speedY = 10;
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
  function boundBalls (obj) {
    if (obj.x >= BOARD_WIDTH - obj.width || obj.x <= 0) {
      obj.speedX = -obj.speedX;
    }
    if (obj.y >= BOARD_HEIGHT - obj.height || obj.y <= 0) {
      obj.speedY = -obj.speedY;
    }
  }
  function boundPlayers (obj) {
    if (obj.y < 0 || obj.y > BOARD_HEIGHT - obj.height) {
      obj.y -= obj.speedY;
    }
  }
  function scoring () {
    var ballX = 925;
    var ballY = 422.5;
    if (ball.x >= BOARD_WIDTH - ball.width) {
      p1Score++;
      ball.x = ballX;
      ball.y = ballY;
      ball.speedX = 0;
      ball.speedY = 0;
    }
    if (ball.x <= 0) {
      p2Score++;
      ball.x = ballX;
      ball.y = ballY;
      ball.speedX = 0;
      ball.speedY = 0;
    }
  }
  function gameText () {
    $('#p1Score').text('Player 1 Score: ' + p1Score);
    $('#p1Score').css('left', $('#p1Score').x);
    $('#p2Score').text('Player 2 Score: ' + p2Score);
    $('#p2Score').css('left', $('#p2Score').x);
    if (start === false) {
      $('#startText').text('Press SPACE to start.');
      $('#startText').css("left", BOARD_WIDTH / 2 - $('#startText').width() / 2);
    }
    if (start === true) {
      $("#startText").hide();
      $('#startTextBox').hide();
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
