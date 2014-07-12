var countZombies = 5;

var createZombies = function () {
    var i;
    zombies = game.add.group();

    for (i = 0; i < countZombies; i += 1) {
        createZombie(zombies);
    }

    zombieAudio = game.add.audio('zombie_audio');
    zombieAudio.addMarker('growl', 0.7, 1.9);

    zombieAudio.play('growl');
}

var createZombie = function (zombies) {
    var position = game.width / 2,
        direction = !!Math.round(Math.random()) ? -1 : 1;
        offset = Math.random() * 300,
        zombie = zombies.create(position + direction * offset, game.height - 50, 'zombie');

    zombie.anchor.setTo(0.5, 0.5);
    zombie.checkWorldBounds = true;
    game.physics.enable(zombie, Phaser.Physics.ARCADE);

    zombie.body.velocity.x = direction * 100;
    zombie.body.checkCollision.any = true;
    zombie.body.collideWorldBounds = true;
    zombie.body.setSize(48, 48);

    return zombie;
}
 
var moveZombie = function () {
    _.each(zombies.children, function (zombie) {
        if (helicopter.y > game.height - 50) {
            return moveZombieToHelicopter(zombie);
        }
        return moveZombieRandomly(zombie);
    });
}

var moveZombieToHelicopter = function (zombie) {
    if (zombie.x < helicopter.x) {
        zombie.body.velocity.x = 50;
    } else if (zombie.x > helicopter.x) {
        zombie.body.velocity.x = -50;
    }
}

var moveZombieRandomly = function (zombie) {
    if (zombie.x >= 100 && zombie.x <= 700) {
        return;
    }

    if (zombie.x < 100) {
        zombie.x = 110;
    }

    if (zombie.x > 700) {
        zombie.x = 690;
    }

    zombie.body.velocity.x *= -1;
}

var zombiePickedUp = function (helicopter, zombie) {
    zombieAudio.play('growl');
    zombie.kill();
    score += 1;
}