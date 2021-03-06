window.onload=function(){
    // Initialize Phaser
    window.game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game_div');

    // Our 'score' global variable
    window.score = 0;

    // Define all the states
    game.state.add('load', load_state);  
    game.state.add('menu', menu_state);  
    game.state.add('main', main_state);  

    // Start with the 'load' state

    game.state.start('load');
};