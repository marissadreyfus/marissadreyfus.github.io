var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree; //declares "tree" variable for later use
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'black');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield

            for (var i = 0; i < 100; i++) {
                var circle = draw.circle(5, "white", "LightGray", 2); //draws a circle and stores it in variable "circle"
                circle.x = canvasWidth * Math.random(); //multiplies random decimal times canvas width and stores it as "circle.x"
                circle.y = groundY * Math.random(); //multiplies random decimal times groundY and stores it as "circle.y"
                background.addChild(circle); //adds circle as child to background
            }//loop draws 100 circles

            var moon = draw.bitmap("img/moon.png"); //draws the moon using "draw.bitmap" and stores it in "moon"
            moon.x = canvasWidth - 300; //adds an x value to "moon"
            moon.y = groundY - 450; //adds a y value to "moon"
            moon.scaleX = 0.5; //scales the moon's x-value
            moon.scaleY = 0.5; //scales the moon's y-value
            background.addChild(moon); //adds "moon" as a child of "background"
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why? A: this allows the tree to be in front of the buildings
            for (var i = 0; i < 5; i++) {
                var buildingHeight = 250 + (100 * Math.random()); //sets building height - work in progress, figure out the height thing
                var buildingColors = ["lightgreen", "lightblue", "pink", "lightgrey", "tan"]; //sets building color
                var buildingOutlines = ["darkgreen", "darkblue", "darkred", "darkgrey", "brown"]; //sets building outline based on color
                var building = draw.rect(75, buildingHeight, buildingColors[i], buildingOutlines[i], 3); //draws buildings
                building.x = 100 * i; //sets building x-value
                building.y = groundY - buildingHeight; //sets building y-value
                background.addChild(building); //adds building as a child of background
                buildings.push(building); //pushes each building into "buildings" array
              }
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); //uses bitmap to draw a tree and stores it in variable "tree"
            tree.x = canvasWidth; //x-position of tree
            tree.y = groundY - 230; //y-position of tree
            background.addChild(tree); //adds tree as a child of background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 3; //moves the tree to the left
            if (tree.x < -200) {
                tree.x = canvasWidth; //teleports tree back to the right side of the screen
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i]; //sets a variable for each individual building
                building.x = building.x - 1; //moves the building
                if (building.x < -200) {
                    building.x = canvasWidth; //teleports building back to the right side of the screen
                }
              }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}