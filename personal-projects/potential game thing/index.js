$(document).ready(runProgram);

function runProgram () {
    var FRAME_RATE = 60; //fps goes crazy//
    var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
    //var BOARD_WIDTH = $("#board").width(); //sets the board width//
    //var BOARD_HEIGHT = $("#board").height(); //sets the board height//
    var KEYCODES = {
        ENTER: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        KILL: 82,
    }
    var playerWithoutNameCurrently = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        width: $('#player').width(),
        height: $('#player').height(),
    }
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    $(document).on('keydown', handleKeyDown);
    $(document).on('keyup', handleKeyUp);

    function newFrame () {

    }
    //HELPER FUNCTIONS//
    function handleKeyDown () {

    }
    function handleKeyUp () {

    }
    
    function endGame() {
        clearInterval(interval);
        location.reload();
        $(document).off();
      }
}
