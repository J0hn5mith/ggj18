function GraphicsTestScene() {}



GraphicsTestScene.show = function() {
    space = new Space();
    space.addSun(new Vec2(960, 400), 45);
    space.addPlanet(new Vec2(960, 700), 55, 0);
};


GraphicsTestScene.hide = function() {

};


GraphicsTestScene.update = function() {


    if(!Game.paused) {
        //GraphicsTestScene.tester.setPos(Mouse.pos);
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
