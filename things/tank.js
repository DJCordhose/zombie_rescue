var tank;

var createTanks = function () {
    tank = new Tank(game, helicopter, 200, game.height - 50);
    game.add.existing(tank);
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
    this.frame = 2;
    this.fired = false;
}
Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tank.prototype.constructor = Tank;

Tank.prototype.update = function () {
    this.game.physics.arcade.overlap(this, this.helicopter, this.helicopterHit, null, this);

    var dx = Math.abs(this.position.x - this.helicopter.position.x);
    var dy = Math.abs(this.position.y - this.helicopter.position.y);
//    console.log(dx > this.game.camera.width, dx , this.game.camera.width);
    if (dx < this.game.camera.width / 2) {
        this.shoot();
    }

};

Tank.prototype.helicopterHit = function (tank, helicopter) {
    helicopter.kill();
};

Tank.prototype.shoot = function () {
    if (!this.fired) {
        var dx = this.position.x - this.helicopter.position.x;
        var dy = this.position.y - this.helicopter.position.y;

        var degree = Math.tan(dy/dx);

        var shot = new Shot(game, this.position.x, this.position.y - 10, degree);
        game.add.existing(shot);

        this.fired = true;
    }

};
