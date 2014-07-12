var SHOT_SPEED = 100;

function Shot(game, x, y, angle) {
    Phaser.Sprite.call(this, game, x, y, 'shot');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.rotation = angle;
    this.body.velocity.x = Math.cos(angle) * SHOT_SPEED;
    this.body.velocity.y = Math.sin(angle) * SHOT_SPEED;
    this.body.angle = angle;
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;
