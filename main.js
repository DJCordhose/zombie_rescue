var helicopter;
var zombie;
var introText;
var levelText;
var lifesText;
var rescueText;
var isGameOver = false;

var showDebugInfos = false;

var currentLevel = 1;
var lifes = 3;
var currentRescue = 0;
var rescues = 0;

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        var helicopterYPosition = game.height / 2;
        var helicopterXPosition = game.width / 2;
        helicopter = game.add.sprite(helicopterXPosition, helicopterYPosition, 'helicopter');
        helicopter.anchor.setTo(0.5, 0.5);
        helicopter.checkWorldBounds = true;
        game.physics.enable(helicopter, Phaser.Physics.ARCADE);
        helicopter.body.checkCollision.any = true;
        helicopter.body.collideWorldBounds = true;
        helicopter.body.setSize(37, 37);

        var zombieXPosition = game.width / 2;
        zombie = game.add.sprite(zombieXPosition, game.height - 50, 'zombie');
        zombie.anchor.setTo(0.5, 0.5);
        zombie.checkWorldBounds = true;
        game.physics.enable(zombie, Phaser.Physics.ARCADE);
        zombie.body.velocity.x = -100;
        zombie.body.checkCollision.any = true;
        zombie.body.collideWorldBounds = true;
        zombie.body.setSize(37, 37);

        introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        introText.anchor.setTo(0.5, 0.5);
        introText.visible = false;

        var currentLevelText = 'Level: ' + currentLevel;
        levelText = game.add.text(game.world.width/7*4, 20, currentLevelText, { font: "18px Arial", fill: "#ffffff", align: "center" });
        levelText.anchor.setTo(0.5, 0.5);
        levelText.visible = true;

        var rescueText = 'Rescues: ' + currentRescue;
        rescueText = game.add.text(game.world.width/7*5, 20, rescueText, { font: "18px Arial", fill: "#ffffff", align: "center" });
        rescueText.anchor.setTo(0.5, 0.5);
        rescueText.visible = true;

        var lifeLevelText = 'Lifes: ' + lifes;
        lifesText = game.add.text(game.world.width/7*6, 20, lifeLevelText, { font: "18px Arial", fill: "#ffffff", align: "center" });
        lifesText.anchor.setTo(0.5, 0.5);
        lifesText.visible = true;

         // No 'this.score', but just 'score'
        score = 0; 
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

            }
        }
    },

    render: function () {
        if (showDebugInfos) {
            game.debug.body(frog);
            game.debug.spriteInfo(frog);
        }
    }
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

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);
game.state.start('main');  