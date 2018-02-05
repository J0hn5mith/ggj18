function Intro() {

    this.timer = Intro.START_TIME;
    this.playing = true;
    this.starsVisibility = 0.0;
    this.sunSecondaryGlareVisibility = 0.0;
    this.sunY = 400;
    this.sunRisePlanetY = 700;
    this.sunRise = 0.0;
    this.cameraPan = 0.0;
}


Intro.START_TIME = 0.0;
Intro.PROGRESS_PER_SEC = 1.0 / 81.0; // change this to 1 for faster intro;


Intro.prototype.start = function() {
    Sound.play("intro", { volume : 100 });
};


Intro.prototype.update = function() {
    if(this.playing) {
        this.timer += Timer.delta * Intro.PROGRESS_PER_SEC;
        if(this.timer >= 1.0) {
            this.playing = false;
            this.timer = 1.0;
            this.starsVisibility = 1.0;
            this.sunSecondaryGlareVisibility = 1.0;
            this.sunRise = 1.0;
            this.cameraPan = 1.0;

            Sound.setVolume("ingame_serious", 0);
            Sound.play("ingame_serious", { loops : 10});
            Sound.fadeVolume("ingame_serious", 0, 50, 5);

        } else {
            this.starsVisibility = Utils.scale0to1(this.timer, 5 / 81, 71 / 81);
            this.sunSecondaryGlareVisibility = Utils.scale0to1(this.timer, 5 / 81, 71 / 81);
            this.sunRise = Utils.scale0to1(this.timer, 5 / 81, 71 / 81);
            this.cameraPan = Utils.scale0to1(this.timer, 71 / 81, 1);
        }
        if(this.timer >= 71 / 81) {
            background.dir = -1;
            background.targetPos = 0;
        }
        space.planets[0].pos.y = this.sunY + (Interpolate.sin(this.sunRise) * (this.sunRisePlanetY - this.sunY));
    }
};


Intro.prototype.draw = function() {

    if(this.playing) {
        var loadFadeout = Utils.scale0to1(this.timer, 0.0, 0.01, true);

        if(loadFadeout > 0.0) {
            c.globalAlpha = loadFadeout;
            c.fillStyle = "#eee";
            c.beginPath();
            c.arc(Game.centerX, Game.centerY, 68, 0, 2 * Math.PI, false);
            c.arc(Game.centerX, Game.centerY, 60, 0, 2 * Math.PI, true);
            c.closePath();
            c.fill();
            c.globalAlpha = 1;
        }

        if(this.timer > (20.95 / 81) && this.timer < (25.9 / 81)) {
            Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "A  GAME  BY  JAN  MEIER  AND  HENRY  RAYMOND");
        }
        if(this.timer > (29.1 / 81) && this.timer < (34 / 81)) {
            Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "MUSIC  BY  VIKTOR  VOGT");
        }
        if(this.timer > (39.2 / 81) && this.timer < (43.5 / 81)) {
            Text.draw(Game.centerX, 870, 50, "geometria", "center", "#eee", "\"ALSO  SPRACH  ZARATHUSTRA\"  BY  RICHARD  STRAUSS");
            Text.draw(Game.centerX, 930, 50, "geometria", "center", "#eee", "PERFORMED  BY  THE  UNIVERSITY  OF  CHICAGO  ORCHESTRA");
        }
        if(this.timer > (47.2 / 81) && this.timer < (53 / 81)) {
            Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "CREATED  FOR  GLOBAL  GAME  JAM  2018");
        }
        if(this.timer > (59.2 / 81) && this.timer < (70.5 / 81)) {
            Text.draw(Game.centerX, 900, 90, "geometria", "center", "#eee", "2018:  A  TRANSMISSION  ODYSSEY");
        }
    }
};
