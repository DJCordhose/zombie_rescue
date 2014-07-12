var Zombies = function (options) {
        _.extend(this, options);

        this.horde = game.add.group();
        _.times(this.numberOfZombies, this.spawn, this);

        this.setSound();
        this.setLimits();
    };

Zombies.prototype.setLimits = function () {
    this.limits = {
        left: this.homePosition - this.zombieRoamingDistance,
        right: this.homePosition + this.zombieRoamingDistance
    };
};

Zombies.prototype.setSound = function () {
    this.audio = game.add.audio('zombie_audio');
    this.audio.addMarker('growl', 0.7, 1.9);
    this.sayHello();
};

Zombies.prototype.sayHello = function () {
    this.audio.play('growl');
};

Zombies.prototype.getPosition = function () {
    return this.homePosition + this.getDirection() * this.getOffset();
};

Zombies.prototype.getDirection = function () {
    return !!Math.round(Math.random()) ? -1 : 1;
};

Zombies.prototype.getOffset = function () {
    return Math.random() * this.zombieOffset;
};

Zombies.prototype.getGround = function () {
    return game.height - 50;
};

Zombies.prototype.spawn = function () {
    var zombie = this.horde.create(this.getPosition(), this.getGround(), 'zombie');

    zombie.anchor.setTo(0.5, 0.5);
    zombie.checkWorldBounds = true;
    game.physics.enable(zombie, Phaser.Physics.ARCADE);

    zombie.body.velocity.x = this.getDirection() * 100;
    zombie.body.checkCollision.any = true;
    zombie.body.collideWorldBounds = true;
    zombie.body.setSize(48, 48);

    zombie.animations.add('left', [0, 1, 2, 3], 10, true);
    zombie.animations.add('right', [6, 7, 8, 9], 10, true);
    zombie.animations.add('standing', [5] , 10, true);
    zombie.animations.add('dead', [6], 10, true);

    zombie.animations.play('left');
};

Zombies.prototype.move = function () {
    _.each(this.horde.children, function (zombie) {
        if (helicopter.helicopterLanded) {
            return this.moveToHelicopter(zombie);
        }
        return this.moveRandomly(zombie);
    }, this);
};

Zombies.prototype.moveToHelicopter = function (zombie) {
    if (zombie.x < helicopter.x) {
        zombie.body.velocity.x = 50;
        zombie.animations.play('right');

    } else if (zombie.x > helicopter.x) {
        zombie.body.velocity.x = -50;
        zombie.animations.play('left');
    }
};

Zombies.prototype.moveRandomly = function (zombie) {

    this.speedUp(zombie);

    if (zombie.x >= this.limits.left && zombie.x <= this.limits.right) {
        return;
    }

    if (zombie.x < this.limits.left) {
        zombie.x = this.limits.left + 10;
        zombie.animations.play('right');
    }

    if (zombie.x > this.limits.right) {
        zombie.x = this.limits.right - 10;
        zombie.animations.play('left');
    }

    this.turnAround(zombie);
};

Zombies.prototype.speedUp = function (zombie) {
    if (Math.abs(zombie.body.velocity.x) === 50) {
        zombie.body.velocity.x *= 2;
    }
};

Zombies.prototype.turnAround = function (zombie) {
    zombie.body.velocity.x *= -1;
};

Zombies.prototype.pickUp = function (helicopter, zombie) {
    if (!helicopter.helicopterLanded) {
        return;
    }
    this.sayHello();
    zombie.kill();
    score += 1;
};