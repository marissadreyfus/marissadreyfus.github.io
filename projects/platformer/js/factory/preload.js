(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    
    // TODO : Load config for url //
    opspark.preload = function (game) {
        game.load.image('cannon', './asset/cannon.png');
        game.load.image('projectile', './asset/projectile.png');
        game.load.image('platform', './asset/platform.png');
        game.load.image('collectable1', './asset/collectable/chaos_emerald_1.png');
        game.load.image('collectable2', './asset/collectable/chaos_emerald_2.png');
        game.load.image('collectable3', './asset/collectable/chaos_emerald_3.png');
        game.load.image('collectable4', './asset/collectable/chaos_emerald_4.png');
        game.load.image('collectable5', './asset/collectable/chaos_emerald_5.png');
        game.load.image('collectable6', './asset/collectable/chaos_emerald_6.png');
        game.load.image('collectable7', './asset/collectable/chaos_emerald_7.png');
        game.load.atlas('halle', './asset/halle/phaser-json-array/halle.png', './asset/halle/phaser-json-array/halle.json');
    };
})(window);
