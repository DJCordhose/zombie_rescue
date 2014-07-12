var livesMessage = 'Lives: ';
var scoreMessage = 'Score: ';

var scoreText;
var livesText;

var createTexts = function () {
    var textStyle = {font: '32px VT323', fill: '#de00ff', align: 'center'},
        textSprite = game.add.sprite(0,0);

    scoreText = game.add.text(0, 0, scoreMessage + score, textStyle);
    livesText = game.add.text(1070, 0, livesMessage + lives, textStyle);
    gameOverText = game.add.text(380, 250, '', {font: '100px VT323', fill: '#de00ff', align: 'center'});

    textSprite.fixedToCamera = true;
    textSprite.cameraOffset.x = 10;
    textSprite.cameraOffset.y = 10;

    textSprite.addChild(scoreText);
    textSprite.addChild(livesText);

    scoreText.postUpdate = function () {
        this.text = scoreMessage + score;
    }

    livesText.postUpdate = function () {
        this.text = livesMessage + lives;
    }

    gameOverText.postUpdate = function () {
        if (isGameOver) {
            this.text = "GAME OVER!";
        }
    }
};
