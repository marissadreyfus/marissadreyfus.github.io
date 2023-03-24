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
                { "type": "sawblade", "x": 1000, "y": groundY - (100 * Math.random())},
                { "type": "sawblade", "x": 10000, "y": groundY - (5 * Math.random())},
                { "type": "sawblade", "x": 100000, "y": groundY - (100 * Math.random())},

                { "type": "enemy", "x": 2000, "y": groundY - (100 * Math.random()), "color": "red" },
                { "type": "enemy", "x": 20000, "y": groundY - (100 * Math.random()), "color": "red" },

                { "type": "reward", "x": 5000, "y": groundY - (100 * Math.random()) },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawblade (xVal, yVal) {
            var hitZoneSize = 25; //assigns hitzone size to 25
            var damageFromObstacle = 10; //assigns amount of damage taken from hitzone
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            sawBladeHitZone.x = xVal; //assigns hitzone an x-value
            sawBladeHitZone.y = yVal; //assigns hitzone a y-value
            game.addGameItem(sawBladeHitZone); //adds obstacle to game
            var sawbladeImage = draw.bitmap("img/sawblade.png"); //assigns an image to obstacle
            sawbladeImage.x = -35; //changes x-value of image
            sawbladeImage.y = -35; //changes y-value of image
            sawbladeImage.scaleX = 1.5; //changes horizontal image scale 
            sawbladeImage.scaleY = 1.5; //changes vertical image scale 
            sawBladeHitZone.addChild(sawbladeImage); //adds image as a child of sawBladeHitZone
        }

        

        function createEnemy (x, y, color) {
            var enemy = game.createGameItem("enemy", 25); //creates enemy
            var gameEnemy = draw.rect(50, 50, color); //creates singular enemy
            gameEnemy.x = -25; //enemy x-value
            gameEnemy.y = -25; //enemy y-value
            enemy.x = x;
            enemy.y = y;
            enemy.addChild(gameEnemy); //adds gameEnemy as a child of enemy
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10)
                enemy.fadeOut();
            }
            enemy.onProjectileCollision = function () {
                game.increaseScore(50);
                enemy.fadeOut();
            }
        }
        function createReward (x, y) {
            var reward = game.createGameItem("reward", 25); //creates reward
            var gameReward = draw.rect(50, 50); //creates singular reward
            gameReward.x = -25; //reward x-value
            gameReward.y = -25; //reward y-value
            reward.x = x; //x-value of reward
            reward.y = y; //y-value of reward
            reward.addChild(gameReward); //adds gameReward as a child of reward
            game.addGameItem(reward); //adds reward to game
            reward.velocityX = -2; //allows reward to move
            reward.onPlayerCollision = function () {
                game.changeIntegrity(10); //increases health
                game.increaseScore(100); //increases points
                reward.fadeOut(); //removes reward
            } //what happens when reward collides with the player
        }

            for (var i = 0; i < levelData.gameItems.length; i++) {
                var gameItem = levelData.gameItems[i];

                if (gameItem.type === "sawblade") {
                    createSawblade(gameItem.x, gameItem.y);
                } else if (gameItem.type === "enemy") {
                    createEnemy(gameItem.x, gameItem.y);
                } else if (gameItem.type === "reward") {
                    createReward(gameItem.x, gameItem.y);
                }
            }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
