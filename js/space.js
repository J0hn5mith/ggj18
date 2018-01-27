function Space() {

    this.stars = [];

    for(var i = 0; i < 2000; i++) {
        this.stars.push({
            pos : new Vec2(Utils.randFloat(0, 3840), Utils.randFloat(0, 1080)),
            a : Utils.randFloat(0, HALF_PI),
            s : Utils.randFloat(0.25, 1.0)
        });
    }

    this.blackHoles = [];
    this.suns = [];
}


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
    this.drawBackground();
    this.drawBlackHoleHalos();
    this.drawStars();
    this.drawObjects();
};


Space.prototype.drawBackground = function() {
    Img.drawCustom("background", 0, 0, 1920, 1080, 0, 0, 1920, 1080);
};


Space.prototype.drawBlackHoleHalos = function() {
    for(var i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].drawHalo();
    }
};


Space.prototype.drawStars = function() {
    var star;
    var pos;
    var j;
    c.fillStyle = "#fff";
    for(var i = 0; i < this.stars.length; i++) {
        star = this.stars[i];
        if(star.pos.x > 0 && star.pos.x <= 1920) {
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
    for(i = 0; i < this.suns.length; i++) {
        this.suns[i].draw();
    }
    for(i = 0; i < this.blackHoles.length; i++) {
        this.blackHoles[i].draw();
    }
};