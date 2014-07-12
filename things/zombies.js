var zombie;

var createZombies = function () {
    var zombieXPosition = game.width / 2;

    zombie = game.add.sprite(zombieXPosition, game.height - 50, 'zombie');
    zombie.anchor.setTo(0.5, 0.5);
    zombie.checkWorldBounds = true;
    game.physics.enable(zombie, Phaser.Physics.ARCADE);
    zombie.body.velocity.x = -100;
    zombie.body.checkCollision.any = true;
    zombie.body.collideWorldBounds = true;
    zombie.body.setSize(37, 37);
}

