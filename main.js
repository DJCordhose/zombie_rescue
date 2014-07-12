var isGameOver = false;
var showDebugInfos = false;

var currentLevel = 7;
var score = 0;
var lives = 3;

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {
    create: function () {
        game.world.setBounds(0, 0, 12000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.setBoundsToWorld();
        game.add.tileSprite(0, 0, 12000, 600, 'background');

        createHelicopter();
        createZombies();
        createTexts();

        // And finally we tell Phaser to add and start our 'main' state
        game.state.add('main', main_state);
        game.state.start('main');

        var sfx = game.add.audio('sfx');
        sfx.addMarker('alien death', 1, 1.0);
        sfx.addMarker('boss hit', 3, 0.5);
        sfx.addMarker('escape', 4, 3.2);
        sfx.addMarker('meow', 8, 0.5);
        sfx.addMarker('numkey', 9, 0.1);
        sfx.addMarker('ping', 10, 1.0);
        sfx.addMarker('death', 12, 4.2);
        sfx.addMarker('shot', 17, 1.0);
        sfx.addMarker('squit', 19, 0.3);

        this.sfx = sfx;

        this.zombieAudio = game.add.audio('zombie_audio');
        this.zombieAudio.addMarker('growl', 0.7, 1.9);

        this.zombieAudio.play('growl');

    },

    update: function () {

        if (!isGameOver) {
            game.physics.arcade.overlap(helicopter, zombie, zombiePickedUp, null, this);
            game.physics.arcade.collide(helicopter, zombie, this.helicopterZombieCollision, null, this);


            moveZombie();

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                helicopter.y -= 5;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                helicopter.x -= 5;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                helicopter.x += 5;
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                helicopter.y += 5;
            }
        } else {
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                isGameOver = false;
                introText.visible = false;
            }
        }
    },

    helicopterZombieCollision: function (helicopter, zombie) {
        this.sfx.play('ping');
        this.zombieAudio.play('growl');
    }
}

function moveZombie() {
    if (helicopter.y > game.height - 50) {
        if (zombie.x < helicopter.x) {
            zombie.body.velocity.x = 50;
        } else if (zombie.x > helicopter.x) {
            zombie.body.velocity.x = -50;
        }
    } else {
    if (zombie.x < 100) {
        zombie.x = 110;
        zombie.body.velocity.x = zombie.body.velocity.x * -1;
    } else if (zombie.x > 700) {
        zombie.x = 690;
        zombie.body.velocity.x = zombie.body.velocity.x * -1;
    }
}
}

function zombiePickedUp() {
    zombie.kill();
    score += 1;
}
