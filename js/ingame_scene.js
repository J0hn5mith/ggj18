function IngameScene() {}


IngameScene.show = function() {

    gameState = new GameState();
    levelManager = new LevelManager();
    background = new SpaceBackground();
    space = new Space();
    hud = new HUD();
    intro = new Intro();

    levelManager.loadLevels();
    levelManager.startLevel(false);

    intro.start();

    Mouse.left.registerUpCallback("click", function() {
        if(!intro.playing) {
            if(hud.tutorialMode > 0 && hud.tutorialMode < 7) {
                hud.flipTutorial();

            } else if(!simulation.shipFired && (hud.tutorialMode === 0 || hud.tutorialMode >= 7) && background.transAni > 0.9999) {
                if(hud.tutorialMode === 7 || hud.tutorialMode === 11) {
                    hud.flipTutorial();
                }
                simulation.fireShip();
            }
        }
    });
};


IngameScene.hide = function() {
    Mouse.left.deleteUpCallback("click");
};


IngameScene.update = function() {
    simulation.update();
    background.update();
    intro.update();
};


IngameScene.draw = function() {

    c.fillStyle = "#000";
    c.fillRect(0, 0, Game.width, Game.height);

    space.checkSunVisibility();

    space.applyShaking();

    background.draw();
    space.drawHalosAndGlares();
    background.drawStars();
    space.drawObjects();
    hud.draw();
    intro.draw();

    space.removeShaking();
};
