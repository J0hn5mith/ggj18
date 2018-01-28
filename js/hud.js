function HUD(){};


HUD.prototype.show = function(){
    this.tutorialText = new Text({
        size : 28,
        font : "opensans",
        align : "left",
        color : "#fff",
        appearCharPerSec : 20,
        lineHeight: 40,
        letterSpacing : 2.5,
    });

    this.hudText = new Text({
        size : 30,
        font : "opensans",
        align : "right",
        color : "#fff",
    });
};

HUD.prototype._drawLevelInfo = function(){;

};
HUD.prototype._drawLevelInfo = function(){
    this.hudText.drawPosText(
        simulation.target.pos.x + 55,
        simulation.target.pos.y + simulation.start.r + 45,
        `Level ${gameState.levelCounter+1}`
    );
}

HUD.prototype._drawLifes = function(){
    this.hudText.drawPosText(
        simulation.start.pos.x + 100,
        simulation.start.pos.y + simulation.start.r + 75,
        `${gameState.lifes} vessels left`,
    );
};

HUD.prototype._drawTutorial = function() {
    if(gameState.tutorialMode === 1){
        this.tutorialText.drawPosText(
            simulation.start.pos.x -10,
            simulation.start.pos.y + simulation.start.r + 75,
            'On this planet the transmission starts...',
        );
    } else if (gameState.tutorialMode === 2) {
        this.tutorialText.drawPosText(
            simulation.target.pos.x,
            simulation.target.pos.y + simulation.start.r + 75,
            '... and here it ends.',
        );
    } else if (gameState.tutorialMode === 3) {
        this.tutorialText.drawPosText(
            simulation.co[0].pos.x - 300,
            simulation.co[0].pos.y + simulation.start.r + 150,
            'But be aware of the stars.\nThey will intercept the transmission.',
        );
    } else if (gameState.tutorialMode === 4) {
        this.tutorialText.drawPosText(
            1250,
            100,
            'Deep space is dangerous as well.\nTransmissions get lost here quite quickly.',
        );
    } else if (gameState.tutorialMode === 7) {
        this.tutorialText.drawPosText(
            simulation.co[0].pos.x - 300,
            simulation.co[0].pos.y + simulation.start.r + 150,
            'But suns are not only dangerous. They can help as well.\nBy pressing "G" you take advantage of the sun\'s \ngravity and bend the trajectory of your transmission.',
        );
    } else if (gameState.tutorialMode === 6) {
        this.tutorialText.drawPosText(
            simulation.start.pos.x -20,
            simulation.start.pos.y + simulation.start.r + 75,
            'Pointing further away from the planet makes\nthe transmission travel faster.',
        );
    } else if(gameState.tutorialMode === 5){
        this.tutorialText.drawPosText(
            simulation.start.pos.x -20,
            simulation.start.pos.y + simulation.start.r + 75,
            'The mouse is used to direct and initiate\nthe transmission.',
        );
    }
};

HUD.prototype.draw = function() {
    if(gameState.tutorialMode === 0) {
        c.globalAlpha=0.5;
        this._drawLevelInfo();
        this._drawLifes();
        c.globalAlpha=1;
    } else {
        this._drawTutorial()
    }
};
