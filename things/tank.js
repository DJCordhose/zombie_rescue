var createTanks = function () {
    for (var i=0; i < 10; i++) {
        var tank = new Tank(game, helicopter, i * 1000 + 100, game.height - 50);
        game.add.existing(tank);
    }
}

function Tank(game, helicopter, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'tank');
    this.game = game;
    this.helicopter = helicopter;

    this.anchor.setTo(0.5, 0.5);
    this.checkWorldBounds = true;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.checkCollision.any = true;
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.setSize(50, 50);

    this.animations.add('moveLeft', [0, 1], 10, true);
    this.animations.add('left', [1], 10, true);
    this.animations.add('moveRight', [3, 4], 10, true);
    this.animations.add('right', [3], 10, true);

    this.frame = 2;

    var timer = game.time.create(false);
    timer.loop(1000, Tank.prototype.shoot, this);
    timer.start();
}
Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tank.prototype.constructor = Tank;

Tank.prototype.update = function () {
    this.game.physics.arcade.overlap(this, this.helicopter, this.helicopterHit, null, this);
};

Tank.prototype.helicopterHit = function (tank, helicopter) {
    helicopter.kill();
};

Tank.prototype.shoot = function () {

    var dx = Math.abs(this.position.x - this.helicopter.position.x);
    var dy = Math.abs(this.position.y - this.helicopter.position.y);

    if (dx > this.game.camera.width / 2) {
        return;
    }

    var turretY = this.position.y - 10,
        degree = game.physics.arcade.angleBetween(this, this.helicopter);
        halfPi = -1 * Math.PI/2;

    if (degree == halfPi) {
        this.frame = 2;
    } else if (degree < halfPi) {
        this.animations.play('left');
    } else {
        this.animations.play('right');
    }

    var shot = new Shot(game, this, this.helicopter, this.position.x, turretY, degree);
    game.add.existing(shot);
};
