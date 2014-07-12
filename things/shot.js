var SHOT_SPEED = 100;

function Shot(game, origin, helicopter, x, y, angle) {
    Phaser.Sprite.call(this, game, x, y, 'shot');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.helicopter = helicopter;
    this.rotation = angle;
    this.origin = origin;
    this.body.velocity.x = Math.cos(angle) * SHOT_SPEED;
    this.body.velocity.y = Math.sin(angle) * SHOT_SPEED;
    this.body.angle = angle;
}

Shot.prototype = Object.create(Phaser.Sprite.prototype);
Shot.prototype.constructor = Shot;

Shot.prototype.update = function () {
    this.game.physics.arcade.overlap(this, this.helicopter, this.helicopterHit, null, this);

    var distanceX = Math.abs(this.origin.x - this.x);
    if (distanceX >= game.camera.width / 2) {
        var explosion = new Explosion(game, helicopter, helicopter.x, helicopter.y);
        game.add.existing(explosion);
    }
};

Shot.prototype.helicopterHit = function (shot, helicopter) {
    var explosion = new Explosion(game, helicopter, helicopter.x, helicopter.y);
    game.add.existing(explosion);
    shot.kill();
    lives -= 1;

    if (lives === 0) {
        helicopter.kill();
        isGameOver = true;
    }
};
