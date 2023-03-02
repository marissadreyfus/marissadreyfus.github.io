var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //variable for 1 circle
        var circles = []; //array for many circles
        // TODO 2 : Create a function that draws a circle 
        function drawCircle () {
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2); //draws a randomized circle
            physikz.addRandomVelocity(circle, canvas, 10, 10); //gives the drawn circle a randomized velocity
            view.addChild(circle); //makes the circle show up on the screen
            circles.push(circle); //saves the circle into the array stored inside the circles variable
        } //function to draw the circle

        // TODO 3 / 7 : Call the drawCircle() function 
        
        for (var i = 0; i < 100; i++) {
            drawCircle(); //function call
        } //silly loop thing - the entire reason there's that many circles

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() { //fix TODO 4 & 5, there's an error that's not letting any circles move
            // TODO 4 : Update the circle's position //
                //edited and moved to line 56 so it actually worked
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
                //edited and moved to line 57 so it actually worked
            // TODO 9 : Iterate over the array
            for (var i = 0; i < circles.length; i++) {
                var indVal = circles[i]; //indVal is supposed to mean "Individual Value"
                physikz.updatePosition(indVal); //updates circle's position. changed "circles[i]" to variable "indVal" to work for each circle and moved it here so it actually worked
                game.checkCirclePosition(indVal); //checks circle's position. changed "circles[i]" to variable "indVal" to work for each circle and moved it here so it actually worked
            }
        
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width + circle.radius) {
                circle.x = circle.x - circle.radius;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            
            if ( circle.x < 0 - circle.radius ) {
                circle.x = canvas.width + circle.radius;//goes past the left, places it on the right
            }
            if ( circle.y > canvas.height + circle.radius) {
                circle.y = circle.y - circle.radius;//goes past the top, places it at the bottom
            }
            if ( circle.y < 0 - circle.radius ) {
                circle.y = canvas.height + circle.radius;//goes past the bottom, places it at the top
            }

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
