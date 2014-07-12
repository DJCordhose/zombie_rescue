var base;

var createBase = function () {
    var baseXPosition = game.world.width;

    base = game.add.sprite(game.world.width * 2 / 5, game.height - 60, 'base');
    base.anchor.setTo(0.5, 0.5);
    base.checkWorldBounds = true;
    game.physics.enable(base, Phaser.Physics.ARCADE);
    base.body.checkCollision.any = true;
    base.body.collideWorldBounds = true;
    base.body.setSize(48, 48);
}

