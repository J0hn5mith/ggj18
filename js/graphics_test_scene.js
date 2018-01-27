function GraphicsTestScene() {}



GraphicsTestScene.show = function() {
    space = new Space();
    GraphicsTestScene.tester = space.addBlackHole(new Vec2(900, 500), 50);
    space.addSun(new Vec2(900, 500), 40);
};


GraphicsTestScene.hide = function() {

};


GraphicsTestScene.update = function() {


    if(!Game.paused) {
        GraphicsTestScene.tester.setPos(Mouse.pos);
        space.update();
    }
};


GraphicsTestScene.draw = function() {

    c.fillStyle = "#000";
    c.fillRect(0, 0, Game.width, Game.height);

    space.draw();

    if(Game.paused) {
        c.fillStyle = "rgba(0, 0, 0, 0.8)";
        c.fillRect(0, 0, Game.width, Game.height);
        Text.draw(Game.centerX, 100, 16, "opensans", "center", "#fff", "Paused - Press P to unpause");
    }
};
