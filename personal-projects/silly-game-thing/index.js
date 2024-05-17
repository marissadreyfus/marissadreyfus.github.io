$(document).ready(runProgram);

function runProgram () {
    const FRAME_RATE = 60; //fps goes crazy//
    const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
    const gravity = 0.5; // how much is subtracted from speedY each frame
    //var BOARD_WIDTH = $("#board").width(); //sets the board width//
    //var BOARD_HEIGHT = $("#board").height(); //sets the board height//
    var isClimbing = true; //will not default to true permenantly, this is for until i can get jump and crouch working//
    var KEYCODES = {
        ENTER: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        KILL: 82,
    }
    var gamma = {
        id: '#gamma',
        x: 0,
        y: 500,
        speedX: 0,
        speedY: 0,
        width: $('#gamma').width(),
        height: $('#gamma').height(),
    }
    var floorY = $('#floor').y;
    var maxJumpHeight = 50;
    var aboveTheFloor = false;

    //one-time setup stuff//

    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    $(document).on('keydown', handleKeyDown);
    $(document).on('keyup', handleKeyUp);

    //new frame function//

    function newFrame () {
        repos(gamma);
        redraw(gamma);
        handleAboveFloor();
    }
    
    //EVENT FUNCTIONS//

    function handleKeyDown (event) {
        if (event.which === KEYCODES.LEFT) {
            //move left
            gamma.speedX = -3;
        }
        if (event.which === KEYCODES.RIGHT) {
            //move right
            gamma.speedX = 3;
        }
        if (event.which === KEYCODES.UP) {
            //if x collides with x of something to climb (ladder?), climb
            //else, jump
            if (isClimbing) {
                gamma.speedY = -3;
            } else {
                if (gamma.y > floorY - maxJumpHeight) {
                    gamma.speedY = -3
                } else {
                    handleGravity();
                }
            }
        }
        if (event.which === KEYCODES.DOWN) {
            //if on laddar, climb down
            //else, crouch
            if (isClimbing) {
                gamma.speedY = 3;
            } //else {
                
            //}
        }
        if (event.which === KEYCODES.ENTER) {
            //plans to add a pause feature w/ enter, or maybe an inventory if i feel like doing that instead idk, will figure out later
        }
    }
    function handleKeyUp (event) {
        if (event.which === KEYCODES.LEFT || event.which === KEYCODES.RIGHT) {
            //set speedX to 0
            gamma.speedX = 0;
        }
        if (event.which === KEYCODES.UP) {
            //if on ladder, just stop moving
            //else, add gravity until floor or platform contact
            if (isClimbing) {
                gamma.speedY = 0;
            } else {
                handleGravity();
            }
        }
        if (event.which === KEYCODES.DOWN) {
            //if on ladder, stop moving
            //else, uncrouch
            if (isClimbing) {
                gamma.speedY = 0;
            } //else {

            //}
        }
    }

    //HELPER FUNCTIONS//

    function repos (obj) {
        obj.x += obj.speedX;
        obj.y += obj.speedY;
    }
    function redraw (obj) {
        $(obj.id).css('left', obj.x);
        $(obj.id).css('top', obj.y);
    }
    function handleAboveFloor () {
        if (gamma.y < floorY) {
            aboveTheFloor = true;
        }
    }
    function handleGravity () {
        if (aboveTheFloor === true) {
            gamma.speedY = gamma.speedY + gravity;
        }
    }

    function endGame() {
        clearInterval(interval);
        location.reload();
        $(document).off();
      }
    
}
