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
            /* "gameItems": [ //not a completely finished game - I plan on adding more to it after the "finished" product is turned in just for fun
                { "type": "obstacle", "obstHitZone": 25, "x": 1300, "y": groundY - 110, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 1500, "y": groundY - 10, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 1700, "y": groundY - 110, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 1900, "y": groundY - 10, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "enemy", "enmHitZone": 30, "x": 2100, "y": groundY - 50, "image": "img/alien_in_ufo.png", "healthLost": -25, "scoreAdded": 50, "enemyScaleX": 0.2, "enemyScaleY": 0.2, "enmImgX": -50, "enmImgY": -34  },
                //the first set of obstacles/enemies

                { "type": "reward", "x": 2500, "y": groundY - 100, "image": "img/pink_orb.png", "pointsGiven": 15, "healthGiven": 15, "rewardScaleX": 0.3, "rewardScaleY": 0.3, "rwdImgX": -38, "rwdImgY": -31  },
                //the first reward to show up

                { "type": "obstacle", "obstHitZone": 45, "x": 2800, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 3000, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 3200, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                //small rocks 1

                { "type": "enemy", "enmHitZone": 75, "x": 3700, "y": groundY - 50, "image": "img/breakable_rock.png", "healthLost": -100, "scoreAdded": 0, "enemyScaleX": 0.7, "enemyScaleY": 0.7, "enmImgX": -80, "enmImgY": -50  },
                //instakill rock

                { "type": "reward", "x": 4000, "y": groundY - 100, "image": "img/blue_orb.png", "pointsGiven": 30, "healthGiven": 25, "rewardScaleX": 0.3, "rewardScaleY": 0.3, "rwdImgX": -38, "rwdImgY": -31 },
                //another reward, yippee!

                { "type": "asteroid", "asteroidHitZone": 100, "x": 5300, "y": -4700, "damage": -50, "image": "img/asteroid.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 0.5, "imgX": -103.25, "imgY": -96  },
                { "type": "asteroid", "asteroidHitZone": 100, "x": 5500, "y": -4900, "damage": -50, "image": "img/asteroid.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 0.5, "imgX": -103.25, "imgY": -96  },
                { "type": "asteroid", "asteroidHitZone": 25, "x": 5000, "y": -4500, "damage": -10, "image": "img/star.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 1.7, "imgX": -34, "imgY": -34  },
                { "type": "asteroid", "asteroidHitZone": 25, "x": 5200, "y": -4700, "damage": -10, "image": "img/star.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 1.7, "imgX": -34, "imgY": -34  },
                { "type": "asteroid", "asteroidHitZone": 25, "x": 5600, "y": -5000, "damage": -10, "image": "img/star.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 1.7, "imgX": -34, "imgY": -34  },
                { "type": "asteroid", "asteroidHitZone": 25, "x": 5100, "y": -5000, "damage": -10, "image": "img/star.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 1.7, "imgX": -34, "imgY": -34  },
                { "type": "asteroid", "asteroidHitZone": 25, "x": 5700, "y": -5200, "damage": -10, "image": "img/star.png", "velocityX": -2, "velocityY": 2, "spin": -2, "imgScale": 1.7, "imgX": -34, "imgY": -34  },
                //this is supposted to be unfair, you can't actually die to it and it's more of a distraction for:
                { "type": "enemy", "enmHitZone": 75, "x": 6000, "y": groundY - 120, "image": "img/UFO.png", "healthLost": -100, "scoreAdded": 1000, "enemyScaleX": 0.5, "enemyScaleY": 0.5, "enmImgX": -135, "enmImgY": -50 },
                //the entire reason there's that many asteroids in the first place since i couldn't get the multi-shot to work - it's also an instakill

                { "type": "reward", "x": 6500, "y": groundY - 100, "image": "img/green_orb.png", "pointsGiven": 0, "healthGiven": 50, "rewardScaleX": 0.3, "rewardScaleY": 0.3, "rwdImgX": -38, "rwdImgY": -31 },
                //heals you

                { "type": "enemy", "enmHitZone": 25, "x": 7000, "y": groundY - 50, "image": "img/UFO.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.1, "enemyScaleY": 0.1, "enmImgX": -28, "enmImgY": -20   },
                { "type": "enemy", "enmHitZone": 25, "x": 7100, "y": groundY - 40, "image": "img/UFO.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.1, "enemyScaleY": 0.1, "enmImgX": -28, "enmImgY": -20   },
                { "type": "enemy", "enmHitZone": 25, "x": 7200, "y": groundY - 60, "image": "img/UFO.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.1, "enemyScaleY": 0.1, "enmImgX": -28, "enmImgY": -20   },
                { "type": "enemy", "enmHitZone": 25, "x": 7300, "y": groundY - 30, "image": "img/UFO.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.1, "enemyScaleY": 0.1, "enmImgX": -28, "enmImgY": -20   },
                { "type": "enemy", "enmHitZone": 25, "x": 7400, "y": groundY - 70, "image": "img/UFO.png", "healthLost": -10, "scoreAdded": 10, "enemyScaleX": 0.1, "enemyScaleY": 0.1, "enmImgX": -28, "enmImgY": -20   },
                //and, before you ask, you're supposed to be able to hit all 5 mini-UFOs in 1 shot - it's like a little reward after the miniboss thing
                
                { "type": "obstacle", "obstHitZone": 25, "x": 7900, "y": groundY - 10, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 8100, "y": groundY - 110, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 8300, "y": groundY - 10, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                { "type": "obstacle", "obstHitZone": 25, "x": 8500, "y": groundY - 110, "damage": 10, "image": "img/star.png", "rotateVelocity": -5, "obstScaleX": 1.7, "obstScaleY": 1.7, "obstImgX": -34, "obstImgY": -34  },
                //more stars

                { "type": "obstacle", "obstHitZone": 45, "x": 8900, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 9100, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 9300, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 9500, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 9700, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                { "type": "obstacle", "obstHitZone": 45, "x": 9900, "y": groundY, "damage": 5, "image": "img/small_rocks.png", "rotateVelocity": 0, "obstScaleX": 0.7, "obstScaleY": 0.7, "obstImgX": -70, "obstImgY": 0  },
                //even more space rocks

                { "type": "reward", "x": 10100, "y": groundY - 100, "image": "img/medal_thing.png", "pointsGiven": 1000, "healthGiven": 100, "rewardScaleX": 0.3, "rewardScaleY": 0.3, "rwdImgX": -23, "rwdImgY": -35 },
                //yippee!!
                //this is kinda like a beta version if that makes sense, there's a lot more I want to add that I didn't get the chance to yet (I want the game to be way longer than this)
            ]*/
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createObj (type, hitZone, damageDealt, hp, points, x, y, velocityX, velocityY, spin, img, imgScale, imgX, imgY) {
            var obj = game.createGameItem(hitZone, damageDealt); //creates the object
            obj.x = x; //x value
            obj.y = groundY - y; //y value, this time set to automatically include "groundY -" instead of typing it every time
            obj.rotationalVelocity = spin;
            obj.onPlayerCollision = function () {
                game.changeIntegrity(damageDealt); //lowers health
            } //what happens when player collides with object
            if (type === 'enemy') { //if it's an enemy...
                obj.onProjectileCollision = function () {
                    
                    game.increaseScore(points);//increases score
                    obj.fadeOut();//removes object
                }//when object is shot
            } //...it can be shot
            var objImg = draw.bitmap(img);
            objImg.x = imgX;
            objImg.y = imgY;
            objImg.scaleX = imgScale;
            objImg.scaleY = imgScale;
            game.addGameItem(obj);
            obj.addChild(objImg);
            
        }
        /*function createObstacle (obstHitZone, x, y, damage, image, rotateVelocity, obstScaleX, obstScaleY, obstImgX, obstImgY) { 
            var hitZoneSize = obstHitZone; //assigns hitzone size to 25
            var damageFromObstacle = damage; //assigns amount of damage taken from hitzone
            var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates obstacle
            obstacleHitZone.x = x; //assigns hitzone an x-value
            obstacleHitZone.y = y; //assigns hitzone a y-value
            obstacleHitZone.rotationalVelocity = rotateVelocity; //spiiiiin
            game.addGameItem(obstacleHitZone); //adds obstacle to game
            var obstacleImage = draw.bitmap(image); //assigns an image to obstacle
            obstacleImage.x = obstImgX; //changes x-value of image
            obstacleImage.y = obstImgY; //changes y-value of image
            obstacleImage.scaleX = obstScaleX; //changes horizontal image scale 
            obstacleImage.scaleY = obstScaleY; //changes vertical image scale 
            obstacleHitZone.addChild(obstacleImage); //adds image as a child of obstacleHitZone
        }

        function createAsteroid (asteroidHitZone, x, y, damage, image, velocityX, velocityY, spin, imgScale, imgX, imgY) {
            var asteroid = game.createGameItem("asteroid", asteroidHitZone); //creates asteroid
            var gameAsteroid = draw.bitmap(image);//creates singular asteroid
            gameAsteroid.x = imgX; //asteroid image x-value
            gameAsteroid.y = imgY; //asteroid image y-value
            gameAsteroid.scaleX = imgScale; //asteroid image x-scale
            gameAsteroid.scaleY = imgScale; //asteroid image y-scale
            asteroid.x = x; //asteroid x-value
            asteroid.y = y; //asteroid y-value
            asteroid.addChild(gameAsteroid); //adds gameAsteroid as a child of asteroid
            game.addGameItem(asteroid);//adds asteroid to game
            asteroid.velocityX = velocityX;//asteroid x-velocity
            asteroid.velocityY = velocityY;//asteroid y-velocity
            gameAsteroid.rotationalVelocity = spin; //spiiiiin
            asteroid.onPlayerCollision = function () {
                game.changeIntegrity(damage);//lowers health
            }//what happens when player collides with asteroid
        }

        function createEnemy (enmHitZone, x, y, image, healthLost, scoreAdded, enemyScaleX, enemyScaleY, enmImgX, enmImgY) {
            var enemy = game.createGameItem("enemy", enmHitZone); //creates enemy
            var gameEnemy = draw.bitmap(image);//creates singular enemy
            gameEnemy.x = enmImgX; //enemy image x-value
            gameEnemy.y = enmImgY; //enemy image y-value
            gameEnemy.scaleX = enemyScaleX; //enemy image x-scale
            gameEnemy.scaleY = enemyScaleY; //enemy image y-scale
            enemy.x = x; //enemy x-value
            enemy.y = y; //enemy y-value
            enemy.addChild(gameEnemy); //adds gameEnemy as a child of enemy
            game.addGameItem(enemy);//adds enemy to game
            enemy.velocityX = -2;//enemy velocity
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(healthLost);//lowers health
                enemy.fadeOut();//removes enemy
            }//what happens when player collides with enemy
            enemy.onProjectileCollision = function () {
                game.increaseScore(scoreAdded);//increases score
                enemy.fadeOut();//removes enemy
            }//when enemy is shot
        }
        function createReward (x, y, image, pointsGiven, healthGiven, rewardScaleX, rewardScaleY, rwdImgX, rwdImgY) {
            var reward = game.createGameItem("reward", 25); //creates reward
            var gameReward = draw.bitmap(image); //creates singular reward
            gameReward.x = rwdImgX; //image x-value
            gameReward.y = rwdImgY; //image y-value
            reward.x = x; //x-value of reward
            reward.y = y; //y-value of reward
            gameReward.scaleX = rewardScaleX; //reward image x-scale
            gameReward.scaleY = rewardScaleY; //reward image y-scale
            reward.addChild(gameReward); //adds gameReward as a child of reward
            game.addGameItem(reward); //adds reward to game
            reward.velocityX = -2; //allows reward to move
            reward.onPlayerCollision = function () {
                game.changeIntegrity(healthGiven); //increases health
                game.increaseScore(pointsGiven); //increases points
                reward.fadeOut(); //removes reward
            } //what happens when reward collides with the player
        }*/

            for (var i = 0; i < levelData.gameItems.length; i++) {
                var gameItem = levelData.gameItems[i];

                if (gameItem.type === "obstacle") {
                    createObstacle(gameItem.obstHitZone, gameItem.x, gameItem.y, gameItem.damage, gameItem.image, gameItem.rotateVelocity, gameItem.obstScaleX, gameItem.obstScaleY, gameItem.obstImgX, gameItem.obstImgY); //iterates over each object if the type is "obstacle"
                } else if (gameItem.type === "asteroid") {
                    createAsteroid(gameItem.asteroidHitZone, gameItem.x, gameItem.y, gameItem.damage, gameItem.image, gameItem.velocityX, gameItem.velocityY, gameItem.spin, gameItem.imgScale, gameItem.imgX, gameItem.imgY);//iterates over each object if the type is "asteroid"
                } else if (gameItem.type === "enemy") {
                    createEnemy(gameItem.enmHitZone, gameItem.x, gameItem.y, gameItem.image, gameItem.healthLost, gameItem.scoreAdded, gameItem.enemyScaleX, gameItem.enemyScaleY, gameItem.enmImgX, gameItem.enmImgY);//iterates over each object if the type is "enemy"
                } else if (gameItem.type === "reward") {
                    createReward(gameItem.x, gameItem.y, gameItem.image, gameItem.pointsGiven, gameItem.healthGiven, gameItem.rewardScaleX, gameItem.rewardScaleY, gameItem.rwdImgX, gameItem.rwdImgY);//iterates over each object if the type is "reward"
                }
            }//iterates over each value in the object

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
