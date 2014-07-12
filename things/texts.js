var livesMessage = 'Lives: ';
var scoreMessage = 'Score: ';

var scoreText;
var livesText;

var createTexts = function () {
    var textStyle = {font: '18px Arial', fill: '#ffffff', align: 'center'},
        textSprite = game.add.sprite(0,0);

    scoreText = game.add.text(0, 0, scoreMessage + score, textStyle);
    livesText = game.add.text(1115, 0, livesMessage + lives, textStyle);

    textSprite.fixedToCamera = true;
    textSprite.cameraOffset.x = 10;
    textSprite.cameraOffset.y = 10;

    textSprite.addChild(scoreText);
    textSprite.addChild(livesText);

    scoreText.postUpdate = function () {
        this.text = scoreMessage + score;
    }
};
