
function Explosion(game, targetObject, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'explosion');
    this.game = game;
    this.targetObject = targetObject;

    this.checkWorldBounds = true;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(48, 48);
    this.animations.add('explode', [0, 1, 2, 3, 4], 10, false);
    this.frame = 0;
}

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function () {
    this.animations.play('explode', null, false, true);
    this.targetObject.kill();
};

