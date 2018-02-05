function HUD() {

    this.tutorialMode = 1;

    this.tutorialText = new Text({
        size : 24,
        font : "geometria",
        color : "#fff",
        appearCharPerSec : 40,
        lineHeight: 40,
        letterSpacing : 2
    });

    this.hudText = new Text({
        size : 24,
        font : "geometria",
        align : "right",
        color : "#fff",
        letterSpacing : 2
    });

}


HUD.prototype.drawLevelInfo = function(){
    this.hudText.drawPosText(
        simulation.target.pos.x + 55,
        simulation.target.pos.y + simulation.target.r + 45,
        `Level ${gameState.levelCounter+1}`
    );
};


HUD.prototype.drawLives = function(){
    this.hudText.drawPosText(
        simulation.home.pos.x + 100,
        simulation.home.pos.y + simulation.home.r + 75,
        `${gameState.lives} vessels left`,
    );
};


HUD.prototype.drawTutorial = function() {

    if(this.tutorialMode === 1) {
        this.tutorialText.drawPosText(
            simulation.home.pos.x - simulation.home.planetRadius,
            simulation.home.pos.y + simulation.home.planetRadius + 50,
            "They sent the transmission from their planet..."
        );

    } else if(this.tutorialMode === 2) {
        this.tutorialText.drawPosText(
            simulation.target.pos.x - 475,
            simulation.target.pos.y + simulation.target.planetRadius + 50,
            "...and tried to reach a world far away."
        );

    } else if(this.tutorialMode === 3) {
        this.tutorialText.drawPosText(
            simulation.celestialObjects[0].pos.x - 270,
            simulation.celestialObjects[0].pos.y + simulation.celestialObjects[0].objectRadius + 120,
            "However, stars blocked the transmission..."
        );

    } else if(this.tutorialMode === 4) {
        this.tutorialText.drawPosText(
            Game.width - 520,
            Game.height - 100,
            "...or it was lost in deep space."
        );

    } else if(this.tutorialMode === 5) {
        this.tutorialText.drawPosText(
            simulation.home.pos.x - simulation.home.planetRadius,
            simulation.home.pos.y + simulation.home.planetRadius + 50,
            "They placed the transmission on their most mighty ship...",
        );

    } else if(this.tutorialMode === 6) {
        this.tutorialText.drawPosText(
            simulation.home.pos.x - simulation.home.planetRadius,
            simulation.home.pos.y + simulation.home.planetRadius + 50,
            "...entrusted the vessel's helm to their most valiant captain...",
        );

    } else if(this.tutorialMode === 7) {
        this.tutorialText.drawPosText(
            simulation.home.pos.x - simulation.home.planetRadius,
            simulation.home.pos.y + simulation.home.planetRadius + 50,
            "...and fired the vessel into darkness unknown.",
        );

    } else if(this.tutorialMode === 8) {
        this.tutorialText.drawPosText(
            simulation.celestialObjects[0].pos.x - 245,
            simulation.celestialObjects[0].pos.y + simulation.celestialObjects[0].objectRadius + 120,
            " The fearless captain held the G key\nto tighten gravity's grip on his vessel.\n\n        Or sometimes he pressed H\n      to reverse gravity's influence.",
        );

    } else if(this.tutorialMode === 9) {
        this.tutorialText.drawPosText(
            Game.centerX - 375,
            100,
            "But that was not the end of the transmission's journey...",
        );

    } else if(this.tutorialMode === 10) {
        this.tutorialText.drawPosText(
            100,
            Game.height - 200,
            "The captain soon discovered that by daring to change\nthe distance of his mouse to his people's home world,\nhe could adjust the vessels stunning launch velocity.",
        );

    }
};


HUD.prototype.flipTutorial = function() {
    this.tutorialMode++;
    if(this.tutorialMode >= 11) {
        this.tutorialMode = 0;
    }
    if(this.tutorialMode === 7) {
        simulation.pause = false;
    }
};


HUD.prototype.draw = function() {

    if(!intro.playing) {

        if((this.tutorialMode >= 7 || this.tutorialMode === 0) && background.transAni > 0.9999) {

            c.globalAlpha = 0.75;

            if(simulation.shipFired) {
                simulation.ship.draw();
            } else {
                simulation.home.drawMarker();
                simulation.home.drawAimArrow();
            }
            simulation.target.drawMarker();


            this.drawLevelInfo();
            this.drawLives();
            c.globalAlpha = 1;
        }

        if(this.tutorialMode !== 0) {

            this.drawTutorial();

        }
    }
};
