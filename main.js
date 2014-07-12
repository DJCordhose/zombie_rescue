var isGameOver = false;
var showDebugInfos = false;

var currentLevel = 7;
var score = 0;
var lives = 3;
var clusters = [
        {homePosition: 400, numberOfZombies: 3, zombieOffset: 50, zombieRoamingDistance: 100},
        {homePosition: 900, numberOfZombies: 10, zombieOffset: 150, zombieRoamingDistance: 300}
    ];

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {
    create: function () {
        game.world.setBounds(0, 0, 12000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.setBoundsToWorld();
        game.add.tileSprite(0, 0, 12000, 600, 'background');

        createHelicopter();
        createClusters(clusters);
        createBase();
        createTexts();
        createTanks();

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
    },

    update: function () {

        if (!isGameOver) {
            _.each(window.clusters, function (cluster) {
                game.physics.arcade.overlap(helicopter, cluster.zombies.horde, cluster.zombies.pickUp, null, cluster.zombies);
                cluster.zombies.move();
            });

            if (helicopter.y > game.height - 60) {
                helicopter.animations.stop();
                helicopter.helicopterLanded = true;
                helicopter.angle = 0;
            } else {
                if (helicopter.helicopterLanded) {
                    helicopter.animations.play(helicopter.helicopterDirection);
                    helicopter.helicopterLanded = false;
                }
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !helicopter.helicopterLanded) {
                helicopter.x -= 5;
                helicopter.animations.play('left');
                helicopter.helicopterDirection = 'left';
                helicopter.angle = 0;
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !helicopter.helicopterLanded) {
                helicopter.x += 5;
                helicopter.animations.play('right');
                helicopter.helicopterDirection = 'right';
                helicopter.angle = 0;
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.moveUp(helicopter, helicopter.helicopterDirection);
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !helicopter.helicopterLanded) {
                // helicopter.y += 5;
                this.moveDown(helicopter, helicopter.helicopterDirection, helicopter.helicopterLanded);
            }
        } else {
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                isGameOver = false;
                introText.visible = false;
            }
        }
    },

    moveUp: function (helicopter, helicopterDirection) {
        helicopter.y -= 5;

        if (helicopterDirection === 'left') {
            helicopter.angle = 20;
        } else {
            helicopter.angle = -20;
        }
    },

    moveDown: function (helicopter, helicopterDirection, helicopterLanded) {
        if (helicopterLanded) {
            return;
        }

        helicopter.y += 5;

        if (helicopterDirection === 'left') {
            helicopter.angle = -20;
        } else {
            helicopter.angle = 20;
        }
    }
}
