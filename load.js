var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        game.load.image('helicopter', 'assets/helicopter.png');
        game.load.image('zombie', 'assets/zombie.png');
        game.load.image('background', 'assets/bg.png');

        game.load.audio('sfx', [ 'assets/sounds/fx_mixdown.mp3', 'assets/sounds/fx_mixdown.ogg' ], true);
        game.load.audio('zombie_audio', [ 'assets/sounds/zombie.mp3', 'assets/sounds/zombie.ogg' ], true);

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};