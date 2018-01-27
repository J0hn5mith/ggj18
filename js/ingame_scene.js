function IngameScene() {}

function GameState(){
    this.lifes = 3;
    this.levelCounter = 0;
}

GameState.prototype.nextLevel = function() {
    this.levelCounter++;
    IngameScene.restartLevel();
};

GameState.prototype.shipDestroyed = function() {
    simulation.puase = true;
    this.lifes--;
    this._checkGameState();

    IngameScene.restartLevel();
}

GameState.prototype._checkGameState = function() {
    if(this.lifes <= 0){
        this.levelCounter = 0;
        this.lifes = 3;
        console.log('You loose');
    }
    if(this.level >= 3){
        console.log('You Win');
    }
}

IngameScene.levelCounter = 2;

IngameScene.show = function() {

    gameState = new GameState();
    space = new Space();

    // do stuff before we update and draw this scene for the first time
    IngameScene._loadLevels();
    IngameScene.hud = new HUD();
    IngameScene.hud.show();

    IngameScene.restartLevel()
};

IngameScene._loadLevels = function() {
    IngameScene.levels = Levels();
};

IngameScene.restartLevel = function() {
    IngameScene.currentLevel = IngameScene.levels[gameState.levelCounter]
    simulation = new Simulation(IngameScene.currentLevel);
    simulation.show()
};


IngameScene.hide = function() {

    // do stuff before we draw and update the next scene
};


IngameScene.resize = function() {

    // do stuff when window is resized
};


IngameScene.update = function() {

    // update stuff here

    if(!Game.paused) {
        simulation.update(Timer.delta)
        // update stuff except when paused
    }
};


IngameScene.draw = function() {

    // clear scene
    c.fillStyle = "#000";
    c.fillRect(0, 0, Game.width, Game.height);

    // draw stuff here
    space.draw();
    simulation.draw()
    IngameScene.hud.draw();

    // draw pause screen when paused
    if(Game.paused) {
        c.fillStyle = "rgba(0, 0, 0, 0.8)";
        c.fillRect(0, 0, Game.width, Game.height);
        Text.draw(Game.centerX, 100, 16, "opensans", "center", "#fff", "Paused - Press P to unpause");
    }
};
