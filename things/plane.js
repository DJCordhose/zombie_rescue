var plane;

var createPlane = function () {
    plane = game.add.sprite(0, Math.random() * game.world.height, 'plane');
    plane.anchor.setTo(0.5, 0.5);
    plane.checkWorldBounds = true;
    game.physics.enable(plane, Phaser.Physics.ARCADE);
    plane.body.checkCollision.any = true;
    plane.body.collideWorldBounds = true;
    plane.body.setSize(128, 148);
    plane.body.velocity.x = 100;
}