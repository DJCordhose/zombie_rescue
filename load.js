var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        game.load.spritesheet('helicopter', 'assets/heli_map96x48.png', 96, 48);
        game.load.image('base', 'assets/house.png');
        game.load.image('zombie', 'assets/zombie/zombie_0.png');
        game.load.image('background', 'assets/bg.png');

        game.load.audio('sfx', [ 'assets/sounds/fx_mixdown.mp3', 'assets/sounds/fx_mixdown.ogg' ], true);

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};