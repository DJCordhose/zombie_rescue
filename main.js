var isGameOver = false;
var showDebugInfos = false;

var currentLevel = 7;
var score = 0;
var lives = 3;
var helicopterLanded = false;
var helicopterDirection = 'left';

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {
    create: function () {
        game.world.setBounds(0, 0, 12000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.setBoundsToWorld();
        game.add.tileSprite(0, 0, 12000, 600, 'background');

        createHelicopter();
        createBase();
        createZombies();
        createTexts();
        createTanks();
        createPlane();

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

        game.time.events.add(Phaser.Timer.SECOND * 10, createPlane, this);

    },

    update: function () {

        if (!isGameOver) {
            game.physics.arcade.overlap(helicopter, zombie, zombiePickedUp, null, this);
            game.physics.arcade.collide(helicopter, zombie, this.helicopterZombieCollision, null, this);

            moveZombie();

            if (helicopter.y > game.height - 50) {
                helicopter.animations.stop();
                helicopterLanded = true;
            } else {
                if (helicopterLanded == true) {
                    helicopter.animations.play(helicopterDirection);
                    helicopterLanded = false;
                }
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                helicopter.y -= 5;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                helicopter.x -= 5;
                helicopter.animations.play('left');
                helicopterDirection = 'left';
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                helicopter.x += 5;
                helicopter.animations.play('right');
                helicopterDirection = 'right';
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
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
