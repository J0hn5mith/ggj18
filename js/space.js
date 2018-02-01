function Space() {

    this.backgroundCanvas = Utils.createCanvas(3840, 1080);
    this.backgroundC = Utils.getContext(this.backgroundCanvas);
    Img.drawIn(this.backgroundC, "background", 0, 0);
    this.backgroundData = this.backgroundC.getImageData(0, 0, 3840, 1080).data;

    this.backgroundOffsetX = 1920;
    this.backgroundTargetPos = 1;
    this.backgroundCurrentPos = 1;
    this.backgroundDir = 1;

    this.intro = Space.INTRO_START;
    this.playingIntro = true;
    this.starsVisibility = 0.0;
    this.sunSecondaryGlareVisibility = 0.0;
    this.sunY = 400;
    this.sunRisePlanetY = 700;
    this.sunRise = 0.0;
    this.introFlip = 0.0;

    this.stars = [];

    for(var i = 0; i < 2400; i++) {
        this.stars.push({
            pos : new Vec2(Utils.randFloat(0, 3840), Utils.randFloat(0, 1080)),
            a : Utils.randFloat(0, HALF_PI),
            s : Utils.randFloat(0.25, 1.0)
        });
    }

    this.reset();

    Sound.play("intro", { volume : 100 });
}


Space.INTRO_START = 0.0;
Space.INTRO_SPEED = 1.0 / 81.0; // change this to 1 for faster intro;


Space.prototype.reset = function() {
    this.blackHoles = [];
    this.suns = [];
    this.planets = [];
};


Space.prototype.backgroundSwitch = function() {
    if(this.backgroundDir === 1) {
        this.backgroundDir = -1;
        this.backgroundTargetPos = 0;
    } else {
        this.backgroundDir = 1;
        this.backgroundTargetPos = 1;
    }
};


Space.prototype.addBlackHole = function(pos, r) {
    var id = this.blackHoles.length;
    var newBlackHole = new BlackHole(id, pos, r);
    this.blackHoles[id] = newBlackHole;
    return newBlackHole;
};


Space.prototype.addSun = function(pos, r) {
    var id = this.suns.length;
    var newSun = new Sun(id, pos, r);
    this.suns[id] = newSun;
    return newSun;
};


Space.prototype.addPlanet = function(pos, r, type, orbit) {
    var id = this.planets.length;
    var newPlanet = new Planet(id, pos, r, type, orbit);
    this.planets[id] = newPlanet;
    return newPlanet;
};


Space.prototype.update = function() {
    if(this.backgroundCurrentPos !== this.backgroundTargetPos) {
        this.backgroundCurrentPos += this.backgroundDir * Timer.delta * (this.playingIntro ? (1 / 10) : 0.2);
        this.backgroundCurrentPos = Utils.limit(this.backgroundCurrentPos, 0, 1);
        this.backgroundOffsetX = Interpolate.cube(this.backgroundCurrentPos) * 1920;
    }
    if(this.playingIntro) {
        this.intro += Timer.delta * Space.INTRO_SPEED;
        if(this.intro >= 1.0) {
            this.playingIntro = false;
            this.intro = 1.0;
            this.starsVisibility = 1.0;
            this.sunSecondaryGlareVisibility = 1.0;
            this.sunRise = 1.0;
            this.introFlip = 1.0;

            Sound.setVolume("ingame_serious", 0);
            Sound.play("ingame_serious", {loops: true});
            Sound.fadeVolume ("ingame_serious", 0, 50, 2);
        } else {
            this.starsVisibility = Utils.scale0to1(this.intro, 5 / 81, 71 / 81);
            this.sunSecondaryGlareVisibility = Utils.scale0to1(this.intro, 5 / 81, 71 / 81);
            this.sunRise = Utils.scale0to1(this.intro, 5 / 81, 71 / 81);
            this.introFlip = Utils.scale0to1(this.intro, 71 / 81, 1);
        }
        if(this.intro >= 71 / 81) {
            this.backgroundDir = -1;
            this.backgroundTargetPos = 0;
        }
        this.planets[0].pos.y = this.sunY + (Interpolate.sin(this.sunRise) * (this.sunRisePlanetY - this.sunY));
    }
};


Space.prototype.draw = function() {

    this.checkSunVisibility();

    this.drawBackground();
    this.drawBlackHoleHalos();
    this.drawSunGlares();
    this.drawStars();
    this.drawObjects();

    if(this.playingIntro) {
        this.drawIntro();
    }
};


Space.prototype.checkSunVisibility = function() {
    var j;

    for(var i = 0; i < this.suns.length; i++) {
        this.suns[i].visibility = 1.0;
        for(j = 0; j < this.blackHoles.length; j++) {
            this.suns[i].checkCover(this.blackHoles[j]);
        }
        for(j = 0; j < this.planets.length; j++) {
            this.suns[i].checkCover(this.planets[j]);
        }
    }
};


Space.prototype.drawBackground = function() {
    if(this.starsVisibility < 1.0) {
        c.globalAlpha = this.starsVisibility;
    }
    Img.drawCustom("background", this.backgroundOffsetX, 0, 1920, 1080, 0, 0, 1920, 1080);
    if(this.starsVisibility < 1.0) {
        c.globalAlpha = 0.0;
    }
};


Space.prototype.drawBlackHoleHalos = function() {
    for(var i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].drawHalo();
    }
};


Space.prototype.drawSunGlares = function() {
    for(var i = 0; i < this.suns.length; i++) {
        this.suns[i].drawGlare();
    }
};


Space.prototype.drawStars = function() {
    var star;
    var pos;
    var j;
    c.fillStyle = "#fff";

    if(this.starsVisibility < 1.0) {
        c.globalAlpha = this.starsVisibility;
    }

    c.save();
    c.translate(-this.backgroundOffsetX, 0);
    for(var i = 0; i < this.stars.length; i++) {
        star = this.stars[i];
        if(star.pos.x >= this.backgroundOffsetX && star.pos.x <= this.backgroundOffsetX + 1920) {
            pos = star.pos;
            for(j = 0; j < this.blackHoles.length; j++) {
                if(this.blackHoles[j].isStarAffected(pos)) {
                    pos = this.blackHoles[j].affectStar(pos);
                }
            }

            c.save();
            c.translate(pos.x, pos.y);
            c.rotate(star.a);
            c.scale(star.s, star.s);
            c.fillRect(-1, -1, 2, 2);
            c.restore();
        }
    }

    c.restore();

    if(this.starsVisibility < 1.0) {
        c.globalAlpha = 1.0;
    }
};


Space.prototype.drawObjects = function() {

    var i;
    var j;

    var lightingSun = null;
    if(this.suns.length > 0) {
        lightingSun = this.suns[0];
    } else if(this.blackHoles.length > 0) {
        lightingSun = this.blackHoles[0];
    }

    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].draw();
    }
    for(i = 0; i < this.planets.length; i++) {
        this.planets[i].draw(lightingSun);
    }
    for(i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].draw();
    }
    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].setGlareGradient();
        for(j = 0; j < this.blackHoles.length; j++) {
            this.suns[i].drawGlareOnObject(this.blackHoles[j], 1);
        }
        for(j = 0; j < this.planets.length; j++) {
            this.suns[i].drawGlareOnObject(this.planets[j], 1.02);
        }
    }
};


Space.prototype.drawIntro = function() {

    var loadFadeout = Utils.scale0to1(this.intro, 0.0, 0.01, true);

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

    if(this.intro > (20.95 / 81) && this.intro < (25.9 / 81)) {
        Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "A  GAME  BY  JAN  MEIER  AND  HENRY  RAYMOND");
    }
    if(this.intro > (29.1 / 81) && this.intro < (34 / 81)) {
        Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "MUSIC  BY  VIKTOR  VOGT");
    }
    if(this.intro > (39.2 / 81) && this.intro < (43.5 / 81)) {
        Text.draw(Game.centerX, 870, 50, "geometria", "center", "#eee", "\"ALSO  SPRACH  ZARATHUSTRA\"  BY  RICHARD  STRAUSS");
        Text.draw(Game.centerX, 930, 50, "geometria", "center", "#eee", "PERFORMED  BY  UNIVERSITY  OF  CHICAGO  ORCHESTRA");
    }
    if(this.intro > (47.2 / 81) && this.intro < (53 / 81)) {
        Text.draw(Game.centerX, 900, 50, "geometria", "center", "#eee", "MADE  FOR  GLOBAL  GAME  JAM  2018");
    }
    if(this.intro > (59.2 / 81) && this.intro < (70.5 / 81)) {
        Text.draw(Game.centerX, 900, 90, "geometria", "center", "#eee", "2018:  A  TRANSMISSION  ODYSSEY");
    }
};
