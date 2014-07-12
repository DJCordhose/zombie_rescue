var helicopter;

var createHelicopter = function () {
    var helicopterYPosition = game.height / 2,
        helicopterXPosition = game.width / 2;

    helicopter = game.add.sprite(helicopterXPosition, helicopterYPosition, 'helicopter');
    helicopter.anchor.setTo(0.5, 0.5);
    helicopter.checkWorldBounds = true;
    game.physics.enable(helicopter, Phaser.Physics.ARCADE);
    helicopter.body.checkCollision.any = true;
    helicopter.body.collideWorldBounds = true;
    helicopter.body.setSize(37, 37);

    game.camera.follow(helicopter);
}