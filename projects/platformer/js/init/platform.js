(function (window) {
  "use strict";
  window.opspark = window.opspark || {};
  window.opspark.platform = window.opspark.platform || {};

  let platform = window.opspark.platform;

  /**
   * init: This function initializes the platforms for the level.
   *
   * GOAL: Add as many platforms necessary to make your level challenging.
   *
   * Use the createPlatform Function to create platforms for the level.
   *
   * createPlatform() takes these arguments:
   *
   *      createPlatform(x, y, scaleX, scaleY);
   *
   *      x: The x coordinate for the platform.
   *      y: The y coordinate for the platform.
   *      scaleX: OPTIONAL The scale factor on the x-axis, this value will
   *              stretch the platform in width.
   *      scaleY: OPTIONAL The scale factor on the y-axis, this value will
   *              stretch the platform in height.
   */
  function init(game) {
    let createPlatform = platform.create;

    ////////////////////////////////////////////////////////////////////////
    // ALL YOUR CODE GOES BELOW HERE ///////////////////////////////////////

    /*
     * ground : here, we create a floor. Given the width of of the platform
     * asset, giving it a scaleX and scaleY of 2 will stretch it across the
     * bottom of the game.
     */
    createPlatform(0, game.world.height - 32, 3, 2); // DO NOT DELETE

    // example:
    createPlatform(470, 260, 0.7);
    createPlatform(270, 570, 0.5);
    createPlatform(500, 530, 0.5);
    createPlatform(180, 460, 0.3);
    createPlatform(10, 460, 0.3);
    createPlatform(300, 340, 0.3);
    createPlatform(300, 170, 0.3);
    createPlatform(800, 450, 0.2);
    createPlatform(100, 250, 0.2);
    createPlatform(770, 200, 0.2);

    // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
  }
  platform.init = init;
})(window);
