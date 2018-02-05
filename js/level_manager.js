function LevelManager() {

    this.levels = [];

    this.currentLevelNumber = 0;
    this.currentLevel = null;
}


LevelManager.prototype.loadLevels = function() {
    this.levels = Levels.getLevels();
};


LevelManager.prototype.startLevel = function(keepOldLevel) {
    this.currentLevel = this.levels[this.currentLevelNumber];
    this.restartLevel(keepOldLevel);
};


LevelManager.prototype.restartLevel = function(keepOldLevel) {
    simulation = new Simulation(this.currentLevel);
    if(!intro.playing) {
        simulation.start();
    }

    if(keepOldLevel) {
        space.nextLevel();
    } else {
        space.reset();
    }
    this.currentLevel.home.initDrawable();
    for(var i = 0; i < this.currentLevel.celestialObjects.length; i++) {
        this.currentLevel.celestialObjects[i].initDrawable();
    }
    this.currentLevel.target.initDrawable();
};


LevelManager.prototype.nextLevel = function() {
    this.currentLevelNumber++;
    this.startLevel(true);
    if(this.currentLevelNumber === 1 && hud.tutorialMode === 8) {
        hud.flipTutorial();
    }
    if(this.currentLevelNumber === 2 && hud.tutorialMode === 10) {
        hud.flipTutorial();
    }
    if(this.currentLevelNumber === 3) {
        alert("Wow! You made it!");
    }
    background.switchSide();
};


LevelManager.prototype.restartGame = function() {
    this.currentLevelNumber = 0;
    this.startLevel(false);
};
