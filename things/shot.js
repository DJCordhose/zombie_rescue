var SHOT_SPEED = 100;

function Shot(game, helicopter, x, y, angle) {
    Phaser.Sprite.call(this, game, x, y, 'shot');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.helicopter = helicopter;
    this.rotation = angle;
    this.body.velocity.x = Math.cos(angle) * SHOT_SPEED;
    this.body.velocity.y = Math.sin(angle) * SHOT_SPEED;
    this.body.angle = angle;
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.update = function () {
    this.game.physics.arcade.overlap(this, this.helicopter, this.helicopterHit, null, this);
};

Shot.prototype.helicopterHit = function (shot, helicopter) {
    helicopter.kill();
};

