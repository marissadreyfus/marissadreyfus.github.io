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
            "name": "Out of this World",
            "number": 1, 
            "speed": -3,
            "gameItems": [ //using these to actually test the items before actually putting in the actual positions. x-positions will be adjusted
                { "type": "obstacle", "x": 1000, "y": groundY - 110, "damage": 10, "image": "img/star.png", "canBreak": false, "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7  },
                { "type": "obstacle", "x": 1100, "y": groundY - 110, "damage": 5, "image": "img/star.png", "canBreak": false, "rotateVelocity": 0, "obstScaleX": 1.7, "obstScaleY": 1.7  },
                { "type": "obstacle", "x": 1200, "y": groundY - 110, "damage": 30, "image": "img/star.png", "canBreak": false, "rotateVelocity": -2, "obstScaleX": 1.7, "obstScaleY": 1.7  },
                { "type": "obstacle", "x": 1300, "y": groundY, "damage": 100, "image": "img/star.png", "canBreak": true, "rotateVelocity": 0, "obstScaleX": 1.7, "obstScaleY": 1.7  },

                { "type": "enemy", "x": 1400, "y": groundY - 50, "image": "img/alien_in_ufo.png", "healthLost": -25, "scoreAdded": 50, "enemyScaleX": 0.5, "enemyScaleY": 0.5  },
                { "type": "enemy", "x": 1500, "y": groundY - 40, "image": "img/star.png", "healthLost": -100, "scoreAdded": 1000, "enemyScaleX": 0.5, "enemyScaleY": 0.5 },
                { "type": "enemy", "x": 1600, "y": groundY - 50, "image": "img/star.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.5, "enemyScaleY": 0.5   },
                { "type": "enemy", "x": 1700, "y": groundY - 40, "image": "img/star.png", "healthLost": -25, "scoreAdded": 25, "enemyScaleX": 1.7, "enemyScaleY": 1.7   },

                { "type": "reward", "x": 1800, "y": groundY - 100, "image": "img/star.png", "pointsGiven": 25, "healthGiven": 10, "rewardScaleX": 0.5, "rewardScaleY": 0.5  },
                { "type": "reward", "x": 1900, "y": groundY - 100, "image": "img/star.png", "pointsGiven": 25, "healthGiven": 10, "rewardScaleX": 0.5, "rewardScaleY": 0.5 },
                { "type": "reward", "x": 2000, "y": groundY - 100, "image": "img/star.png", "pointsGiven": 25, "healthGiven": 10, "rewardScaleX": 0.5, "rewardScaleY": 0.5 },
                { "type": "reward", "x": 2100, "y": groundY - 100, "image": "img/medal_thing.png", "pointsGiven": 25, "healthGiven": 10, "rewardScaleX": 0.5, "rewardScaleY": 0.5 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createObstacle (x, y, damage, image, canBreak, rotateVelocity, obstScaleX, obstScaleY) { 
            var hitZoneSize = 25; //assigns hitzone size to 25
            var damageFromObstacle = damage; //assigns amount of damage taken from hitzone
            var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            obstacleHitZone.x = x; //assigns hitzone an x-value
            obstacleHitZone.y = y; //assigns hitzone a y-value
            obstacleHitZone.rotationalVelocity = rotateVelocity; //spiiiiin
            game.addGameItem(obstacleHitZone); //adds obstacle to game
            var obstacleImage = draw.bitmap(image); //assigns an image to obstacle
            obstacleImage.x = -34; //changes x-value of image
            obstacleImage.y = -34; //changes y-value of image
            obstacleImage.scaleX = obstScaleX; //changes horizontal image scale 
            obstacleImage.scaleY = obstScaleY; //changes vertical image scale 
            obstacleHitZone.addChild(obstacleImage); //adds image as a child of obstacleHitZone

            if (canBreak === true) {
                createObstacle.onProjectileCollision = function () {
                    createObstacle.fadeOut(); 
                }
            } //if the object can "break" or not
            if (image === "img/star.png") {
                hitZoneSize = 50;
            }
        }

        function createEnemy (x, y, image, healthLost, scoreAdded, canShoot, enemyScaleX, enemyScaleY) {
            var enemy = game.createGameItem("enemy", 25); //creates enemy
            var gameEnemy = draw.bitmap(image);//creates singular enemy
            gameEnemy.x = -25; //enemy image x-value
            gameEnemy.y = -25; //enemy image y-value
            gameEnemy.scaleX = enemyScaleX; //enemy image x-scale
            gameEnemy.scaleY = enemyScaleY; //enemy image y-scale
            enemy.x = x; //enemy x-value
            enemy.y = y; //enemy y-value
            enemy.addChild(gameEnemy); //adds gameEnemy as a child of enemy
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(healthLost)
                enemy.fadeOut();
            }
            enemy.onProjectileCollision = function () {
                game.increaseScore(scoreAdded);
                enemy.fadeOut();
            }
            function createEnemyProjectile () {
                var enemyProjectile = game.createGameItem("enemy", 5);
                var gameEnemyProjectile = draw.bitmap(image);
                gameEnemyProjectile.x = -10;
                gameEnemyProjectile.y = -10;
                enemyProjectile.x = x * 3;
                enemyProjectile.y = y;
                enemyProjectile.addChild(gameEnemyProjectile);
                game.addGameItem(enemyProjectile);
                enemyProjectile.velocityX = -6;
                gameEnemyProjectile.scaleX = 0.5;
                gameEnemyProjectile.scaleY = 0.5;
                enemyProjectile.onPlayerCollision = function () {
                    game.changeIntegrity(-5);
                    enemy.fadeOut();
                } 
            }//since this is the only enemy projectile, the numbers are hard-coded (i didn't feel like making even more variables)
            if (canShoot === true) {
                for (i = 0; i < 10; i++) {
                    createEnemyProjectile();
                }
            } 
        }
        function createReward (x, y, image, pointsGiven, healthGiven, rewardScaleX, rewardScaleY) {
            var reward = game.createGameItem("reward", 25); //creates reward
            var gameReward = draw.bitmap(image); //creates singular reward
            gameReward.x = -25; //reward x-value
            gameReward.y = -25; //reward y-value
            reward.x = x; //x-value of reward
            reward.y = y; //y-value of reward
            gameReward.scaleX = rewardScaleX; //enemy image x-scale
            gameReward.scaleY = rewardScaleY; //enemy image y-scale
            reward.addChild(gameReward); //adds gameReward as a child of reward
            game.addGameItem(reward); //adds reward to game
            reward.velocityX = -2; //allows reward to move
            reward.onPlayerCollision = function () {
                game.changeIntegrity(healthGiven); //increases health
                game.increaseScore(pointsGiven); //increases points
                reward.fadeOut(); //removes reward
            } //what happens when reward collides with the player
        }

            for (var i = 0; i < levelData.gameItems.length; i++) {
                var gameItem = levelData.gameItems[i];

                if (gameItem.type === "obstacle") {
                    createObstacle(gameItem.x, gameItem.y, gameItem.damage, gameItem.image, gameItem.canBreak, gameItem.rotateVelocity, gameItem.obstScaleX, gameItem.obstScaleY);
                } else if (gameItem.type === "enemy") {
                    createEnemy(gameItem.x, gameItem.y, gameItem.image, gameItem.healthLost, gameItem.scoreAdded, gameItem.canShoot, gameItem.enemyScaleX, gameItem.enemyScaleY);
                } else if (gameItem.type === "reward") {
                    createReward(gameItem.x, gameItem.y, gameItem.image, gameItem.pointsGiven, gameItem.healthGiven, gameItem.rewardScaleX, gameItem.rewardScaleY);
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
