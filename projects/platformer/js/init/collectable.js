(function (window) {
  "use strict";
  window.opspark = window.opspark || {};
  window.opspark.collectable = window.opspark.collectable || {};
  let collectable = window.opspark.collectable;

  let type = {
    collectable1: { assetKey: "collectable1", points: 50 },
    collectable2: { assetKey: "collectable2", points: 50 },
    collectable3: { assetKey: "collectable3", points: 50 },
    collectable4: { assetKey: "collectable4", points: 50 },
    collectable5: { assetKey: "collectable5", points: 50 },
    collectable6: { assetKey: "collectable6", points: 50 },
    collectable7: { assetKey: "collectable7", points: 50 },
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
    createCollectable(type.collectable1, 785, 140);
    createCollectable(type.collectable2, 815, 390);
    createCollectable(type.collectable3, 115, 190);
    createCollectable(type.collectable4, 860, 627);
    createCollectable(type.collectable5, 335, 115);
    createCollectable(type.collectable6, 130, 455);
    createCollectable(type.collectable7, 590, 40);

    // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
  }
  collectable.init = init;
})(window);
