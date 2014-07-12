var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#71c5cf';
        game.load.spritesheet('helicopter', 'assets/heli_map96x48.png', 96, 48);
        game.load.spritesheet('tank', 'assets/tank_map96x48.png', 96, 48);
        game.load.spritesheet('zombie', 'assets/zombi_map48x48.png', 48, 48);
        game.load.spritesheet('explosion', 'assets/explosion_map48x48.png', 48, 48, 5);
        game.load.image('shot', 'assets/bullet_map16x16.png');
        game.load.image('plane', 'assets/plane.png');
        game.load.image('base', 'assets/basis.png');
        game.load.image('home', 'assets/house.png');
        game.load.image('background', 'assets/bg.png');



        game.load.audio('sfx', [ 'assets/sounds/fx_mixdown.mp3', 'assets/sounds/fx_mixdown.ogg' ], true);
        game.load.audio('zombie_audio', [ 'assets/sounds/zombie.mp3', 'assets/sounds/zombie.ogg' ], true);

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};