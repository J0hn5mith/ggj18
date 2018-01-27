function Space() {

    this.backgroundCanvas = Utils.createCanvas(3840, 1080);
    this.backgroundC = Utils.getContext(this.backgroundCanvas);
    Img.drawIn(this.backgroundC, "background", 0, 0);
    this.backgroundData = this.backgroundC.getImageData(0, 0, 3840, 1080).data;

    this.backgroundOffsetX = 0;

    this.stars = [];

    for(var i = 0; i < 2400; i++) {
        this.stars.push({
            pos : new Vec2(Utils.randFloat(0, 3840), Utils.randFloat(0, 1080)),
            a : Utils.randFloat(0, HALF_PI),
            s : Utils.randFloat(0.25, 1.0)
        });
    }

    this.reset();
}


Space.prototype.reset = function() {
    this.blackHoles = [];
    this.suns = [];
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


Space.prototype.update = function() {

};


Space.prototype.draw = function() {

    this.checkSunVisibility();

    this.drawBackground();
    this.drawBlackHoleHalos();
    this.drawSunGlares();
    this.drawStars();
    this.drawObjects();
};


Space.prototype.checkSunVisibility = function() {
    var j;

    for(var i = 0; i < this.suns.length; i++) {
        this.suns[i].visibility = 1.0;
        for(j = 0; j < this.blackHoles.length; j++) {
            this.suns[i].checkCover(this.blackHoles[j]);
        }
    }
};


Space.prototype.drawBackground = function() {
    Img.drawCustom("background", this.backgroundOffsetX, 0, 1920, 1080, 0, 0, 1920, 1080);
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
};


Space.prototype.drawObjects = function() {

    var i;
    var j;

    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].draw();
    }
    for(i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].draw();
    }
    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].setGlareGradient();
        for(j = 0; j < this.blackHoles.length; j++) {
            this.suns[i].drawGlareOnObject(this.blackHoles[j]);
        }
    }
};