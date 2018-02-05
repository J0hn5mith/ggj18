function GameState() {
    this.lives = 3;
}


GameState.prototype.shipDestroyed = function() {

    Sound.play("boom", {});

    // TODO particle system

    if(levelManager.currentLevelNumber > 1) {
        //this.lives--; TODO
    }

    if(this.lives <= 0) {
        this.lives = 3;
        simulation.pause = true;
        levelManager.restartGame();
        // TODO lose screen
    } else {
        space.shaker.shake(8, 20, 0);
        levelManager.restartLevel();
        simulation.pause = false;
    }

    Sound.fadeVolume("ingame_fun", 50, 0, 2); // TODO
};