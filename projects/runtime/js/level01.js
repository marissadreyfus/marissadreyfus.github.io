var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createObstacle (xVal, yVal) {
            var hitZoneSize = 25; //assigns hitzone size to 25
            var damageFromObstacle = 10; //assigns amount of damage taken from hitzone
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            sawBladeHitZone.x = xVal; //assigns hitzone an x-value
            sawBladeHitZone.y = yVal; //assigns hitzone a y-value
            game.addGameItem(sawBladeHitZone); //adds obstacle to game
            var obstacleImage = draw.bitmap("img/sawblade.png");
            obstacleImage.x = -35;
            obstacleImage.y = -35;
            obstacleImage.scaleX = 1.5;
            obstacleImage.scaleY = 1.5;
            sawBladeHitZone.addChild(obstacleImage);
        }

        createObstacle(400, groundY - 125);
        createObstacle(600, groundY - 10);
        createObstacle(800, groundY - 65);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
