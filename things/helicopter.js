var helicopter;

var createHelicopter = function () {
    var helicopterYPosition = game.height / 2;
    var helicopterXPosition = game.width / 2;

    helicopter = game.add.sprite(game.world.width * 2 / 5, helicopterYPosition, 'helicopter');
    helicopter.anchor.setTo(0.5, 0.5);
    helicopter.checkWorldBounds = true;
    game.physics.enable(helicopter, Phaser.Physics.ARCADE);
    helicopter.body.checkCollision.any = true;
    helicopter.body.collideWorldBounds = true;
    helicopter.body.setSize(96, 48);
    helicopter.animations.add('left', [0, 1], 10, true);
    helicopter.animations.add('right', [3, 4], 10, true);
    helicopter.animations.play('left');

    helicopter.helicopterLanded = false;
    helicopter.helicopterDirection = 'left';

    game.camera.follow(helicopter);
}