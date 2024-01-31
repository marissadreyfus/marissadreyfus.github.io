/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $("#board").width();
  var BOARD_HEIGHT = $("#board").height();
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    KILL: 82,
    W: 87,
    A: 65,
    S: 83,
    D: 68
  }
  // Game Item Objects
  var walker  = {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    width: $("#walker").width(),
    height: $("#walker").height(),
  }
  var walkerP2  = {
    posX2: 388,
    posY2: 388,
    speedX2: 0,
    speedY2: 0,
    width2: $("#walkerP2").width(),
    height2: $("#walkerP2").height(),
  }
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $('#walker').on('click', handleClick);
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
    } else if (event.which === KEY.LEFT) {
      console.log("left pressed");
      walker.speedX = -5;
      //if left pressed, move left
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      walker.speedX = 5;
      //if right pressed, move right
    } else if (event.which === KEY.UP) {
      console.log("up pressed");
      walker.speedY = -5;
      //if up pressed, move up
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      walker.speedY = 5;
      //if down pressed, move down
    } else if (event.which === KEY.KILL) {
      console.log("killbind key pressed");
      endGame();
      //if kill key pressed, die
    } else if (event.which === KEY.A) {
      console.log("left2 pressed");
      walkerP2.speedX2 = -4;
      //if a pressed, move left
    } else if (event.which === KEY.D) {
      console.log("right2 pressed");
      walkerP2.speedX2 = 4;
      //if d pressed, move right
    } else if (event.which === KEY.W) {
      console.log("up2 pressed");
      walkerP2.speedY2 = -4;
      //if w pressed, move up
    } else if (event.which === KEY.S) {
      console.log("down2 pressed");
      walkerP2.speedY2 = 4;
      //if s pressed, move down
    }
  }
  function handleKeyUp (event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT || event.which === KEY.A || event.which === KEY.D) {
      walker.speedX = 0;
      walkerP2.speedX2 = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN || event.which === KEY.W || event.which === KEY.S) {
      walker.speedY = 0;
      walkerP2.speedY2 = 0;
    }
  }
  function handleClick(){
    changeColor();
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function reposGameItem () {
    walker.posX += walker.speedX;
    walker.posY += walker.speedY;
    walkerP2.posX2 += walkerP2.speedX2;
    walkerP2.posY2 += walkerP2.speedY2;
  }
  function redrawGameItem () {
    $("#walker").css("left", walker.posX);
    $("#walker").css("top", walker.posY);
    $("#walkerP2").css("left", walkerP2.posX2);
    $("#walkerP2").css("top", walkerP2.posY2);
  }
  function wall () {
    if (walker.posX > BOARD_WIDTH - walker.width|| walker.posX < 0) {
      walker.posX -= walker.speedX;
    }
    if (walker.posY > BOARD_HEIGHT - walker.height|| walker.posY < 0) {
      walker.posY -= walker.speedY;
    }
    if (walkerP2.posX2 > BOARD_WIDTH - walkerP2.width2|| walkerP2.posX2 < 0) {
      walkerP2.posX2 -= walkerP2.speedX2;
    }
    if (walkerP2.posY2 > BOARD_HEIGHT - walkerP2.height2|| walkerP2.posY2 < 0) {
      walkerP2.posY2 -= walkerP2.speedY2;
    }
  }
  function changeColor () {
    var r = Math.random(0, 255) * 100;
    var g = Math.random(0, 255) * 100;
    var b = Math.random(0, 255) * 100;
    var color = "rgb("+ r + "," + g + "," + b + ")";
    $('#walker').css('background-color', color); 
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