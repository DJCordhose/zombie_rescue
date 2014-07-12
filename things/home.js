var base;
var position = 20;

var createHome = function() {
    base = game.add.sprite(position, game.height - 60, 'base');
    base.anchor.setTo(0.5, 0.5);
    base.checkWorldBounds = true;
    game.physics.enable(base, Phaser.Physics.ARCADE);
    base.body.checkCollision.any = true;
    base.body.setSize(48, 48);
}