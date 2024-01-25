/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    KILL: 82
  }
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  // Game Item Objects
  var walker  = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    width: $("#walker").width(),
    height: $("#walker").height()
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    reposGameItem();
    wall();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log(event.key);
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
      //display pause screen maybe
      //or toggle score display
      //i should add a killbind this time huh...
    } else if (event.which === KEY.LEFT) {
      console.log("left pressed");
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      walker.speedX = 5;
    } else if (event.which === KEY.UP) {
      console.log("up pressed");
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      walker.speedY = 5;
    } else if (event.which === KEY.KILL) {
      console.log("killbind key pressed");
      endGame();
    }
  }
  function handleKeyUp (event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function reposGameItem () {
    walker.posX += walker.speedX;
    walker.posY += walker.speedY;
  }
  function redrawGameItem () {
    $("#walker").css("left", walker.posX);
    $("#walker").css("top", walker.posY);
  }
  function wall () {
    if (walker.posX > BOARD_WIDTH - walker.width|| walker.posX < 0) {
      walker.posX -= walker.speedX;
    }
    if (walker.posY > BOARD_HEIGHT - walker.height|| walker.posY < 0) {
      walker.posY -= walker.speedY;
    }
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    alert("killbind pressed, reset game");
    location.reload();

    // turn off event handlers
    $(document).off();
  }
  
}
