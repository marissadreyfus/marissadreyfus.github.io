(function (window) {
  "use strict";
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};
  let collectable = window.opspark.collectable;

  let type = {
    collectable1: { assetKey: "1", points: 50 },
    collectable2: { assetKey: "2", points: 50 },
    collectable3: { assetKey: "3", points: 50 },
    collectable4: { assetKey: "4", points: 50 },
    collectable5: { assetKey: "5", points: 50 },
    collectable6: { assetKey: "6", points: 50 },
    collectable7: { assetKey: "7", points: 50 },
  };

  window.opspark.collectable.type = type;

  /**
   * init: Initialize all collectables.
   *
   * GOAL: Add as many collectables as necessary to make your level challenging.
   *
   * Use the createCollectable() Function to create collectables for the level.
   * See the type Object, above, for the types of collectables and their point values.
   *
   * createCollectable() takes these arguments:
   *
   *      createCollectable(type, x, y, gravity, bounce);
   *
   *      type: The type of the collectable, use the type Object above.
   *      x: The x coordineate for the collectable.
   *      y: The y coordineate for the collectable.
   *      gravity: OPTIONAL The gravitational pull on the collectable.
   *      bounce: OPTIONAL A factor effecting how much the collectable will bounce off platforms, etc.
   */
  function init(game) {
    let createCollectable = collectable.create;

    ////////////////////////////////////////////////////////////////////////
    // ALL YOUR CODE GOES BELOW HERE ///////////////////////////////////////

    // example:
    createCollectable(type.collectable1, 795, 150);
    createCollectable(type.collectable2, 825, 400);
    createCollectable(type.collectable3, 125, 200);
    createCollectable(type.collectable4, 870, 637);
    createCollectable(type.collectable5, 345, 125);
    createCollectable(type.collectable6, 140, 465);
    createCollectable(type.collectable7, 600, 50);

    // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
  }
  collectable.init = init;
})(window);
