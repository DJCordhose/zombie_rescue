var introText;
var levelText;
var lifesText;
var isGameOver = false;

var showDebugInfos = false;

var currentLevel = 7;
var lifes = 3;

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {
    create: function () {
        game.world.setBounds(0, 0, 12000, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.setBoundsToWorld();

//        game.add.sprite(0, 0, 'background');
        game.add.tileSprite(0, 0, 12000, 600, 'background');

        createHelicopter();
        createZombies();

        introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        introText.anchor.setTo(0.5, 0.5);
        introText.visible = false;

        var currentLevelText = 'Level: ' + currentLevel;
        levelText = game.add.text(game.world.width/5*3, 20, currentLevelText, { font: "18px Arial", fill: "#ffffff", align: "center" });
        levelText.anchor.setTo(0.5, 0.5);
        levelText.visible = true;

        var lifeLevelText = 'Lifes: ' + lifes;
        lifesText = game.add.text(game.world.width/5*4, 20, lifeLevelText, { font: "18px Arial", fill: "#ffffff", align: "center" });
        lifesText.anchor.setTo(0.5, 0.5);
        lifesText.visible = true;

         // No 'this.score', but just 'score'
        score = 0;

        // And finally we tell Phaser to add and start our 'main' state
        game.state.add('main', main_state);
        game.state.start('main');
    },

    update: function () {

        if (!isGameOver) {

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

                resetFrog(frog);
            }
        }
    },

    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(helicopter, 32, 500);    }
}

function moveZombie() {
    if (zombie.x < 100) {
        zombie.x = 110;
        zombie.body.velocity.x = zombie.body.velocity.x * -1;
    } else if (zombie.x > 700) {
        zombie.x = 690;
        zombie.body.velocity.x = zombie.body.velocity.x * -1;
    }
}

