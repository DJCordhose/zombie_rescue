var livesMessage = 'Lives: ';
var scoreMessage = 'Score: ';

var createTexts = function () {
    var textStyle = {font: '18px Arial', fill: '#ffffff', align: 'center'};

    var scoreText = game.add.text(0, 0, scoreMessage + score, textStyle);
    var livesText = game.add.text(1115, 0, livesMessage + lives, textStyle);

    var textSprite = game.add.sprite(0,0);

    textSprite.fixedToCamera = true;
    textSprite.cameraOffset.x = 10;
    textSprite.cameraOffset.y = 10;

    textSprite.addChild(scoreText);
    textSprite.addChild(livesText);
}