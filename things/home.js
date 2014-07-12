var Home = function (position) {
        return this.build(position);
    };

Home.prototype.build = function (position) {
    var building = game.add.sprite(position, this.getGround(), 'base');

    building.anchor.setTo(0.5, 0.5);
    building.checkWorldBounds = true;
    game.physics.enable(building, Phaser.Physics.ARCADE);
    building.body.checkCollision.any = true;
    building.body.setSize(48, 48);

    return building;
}

Home.prototype.getGround = function () {
    return game.height - 60;
};