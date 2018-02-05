function Space() {

    this.blackHoles = [];
    this.suns = [];
    this.planets = [];

    this.oldBlackHoles = [];
    this.oldSuns = [];
    this.oldPlanets = [];

    this.shaker = new Shaking();
}


Space.prototype.reset = function() {
    this.blackHoles = [];
    this.suns = [];
    this.planets = [];
};


Space.prototype.nextLevel = function() {

    this.oldBlackHoles = this.blackHoles;
    this.oldSuns = this.suns;
    this.oldPlanets = this.planets;

    var i;
    for(i = 0; i < this.oldSuns.length; i++) {
        this.oldSuns[i].isOld = true;
    }
    for(i = 0; i < this.oldPlanets.length; i++) {
        this.oldPlanets[i].isOld = true;
    }
    for(i = 0; i < this.oldBlackHoles.length; i++) {
        this.oldBlackHoles[i].isOld = true;
    }

    this.blackHoles = [];
    this.suns = [];
    this.planets = [];
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


Space.prototype.applyShaking = function() {
    this.shaker.apply();
};


Space.prototype.removeShaking = function() {
    this.shaker.remove();
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


Space.prototype.drawHalosAndGlares = function() {
    var i;
    for(i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].drawHalo();
    }
    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].drawGlare();
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

    var oldSun = null;
    var oldTarget = null;

    if(background.transAni < 0.9999 && levelManager.currentLevelNumber > 0) {
        if(this.oldSuns.length > 0) {
            oldSun = this.oldSuns[0];
        } else if(this.oldBlackHoles.length > 0) {
            oldSun = this.oldBlackHoles[0];
        }
        oldTarget = this.oldPlanets[this.oldPlanets.length - 1];

        for(i = 0; i < this.oldSuns.length; i++) {
            this.oldSuns[i].draw();
        }
        for(i = 0; i < this.oldPlanets.length - 1; i++) {
            this.oldPlanets[i].draw(lightingSun, oldSun, oldTarget);
        }
        for(i = 0; i < this.oldBlackHoles.length; i++) {
            this.oldBlackHoles[i].draw();
        }
        for(i = 0; i < this.oldSuns.length; i++) {
            this.oldSuns[i].setGlareGradient();
            for(j = 0; j < this.oldBlackHoles.length; j++) {
                this.oldSuns[i].drawGlareOnObject(this.oldBlackHoles[j], 1);
            }
            for(j = 0; j < this.oldPlanets.length - 1; j++) {
                this.oldSuns[i].drawGlareOnObject(this.oldPlanets[j], 1.02);
            }
        }
    }

    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].draw();
    }
    for(i = 0; i < this.planets.length; i++) {
        this.planets[i].draw(lightingSun, oldSun, oldTarget);
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