function Sun(id, pos, r) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;

    this.visibility = 1.0;
}


Sun.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


Sun.prototype.getPos = function() {
    if(space.playingIntro) {
        var clone = this.pos.copy();
        clone.x = Game.centerX + (Interpolate.quad(space.introFlip) * (this.pos.x - Game.centerX));
        return clone;
    } else {
        return this.pos;
    }
};


Sun.prototype.checkCover = function(object) {
    var objPos = object.getPos();
    var dist = this.pos.subtract(objPos).norm();
    var coverRatio = (this.r + dist - object.r) / (2 * this.r);
    coverRatio = Utils.limit(coverRatio, 0.0, 1.0);
    this.visibility *= coverRatio;
};


Sun.prototype.setGlareGradient = function() {
    var pos = this.getPos();
    var gradient = c.createRadialGradient(pos.x, pos.y, this.r, pos.x, pos.y, this.r * (3.5 + (1.5 * this.visibility)));
    gradient.addColorStop(0.0, "rgba(214, 72, 63, " + this.visibility + ")");
    gradient.addColorStop(1.0, "rgba(214, 72, 63, 0.0)");
    c.fillStyle = gradient;
};


Sun.prototype.drawGlare = function() {
    this.setGlareGradient();
    var pos = this.getPos();
    Utils.drawCircle(c, pos.x, pos.y, this.r * 5);
    c.fill();
};


Sun.prototype.draw = function() {
    var pos = this.getPos();
    var gradient = c.createRadialGradient(pos.x, pos.y, this.r, pos.x, pos.y, this.r * 3);
    gradient.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.06, "rgba(254, 223, 139, " + (0.6 * space.sunSecondaryGlareVisibility) + ")");
    gradient.addColorStop(0.12, "rgba(214, 72, 63, " + (0.3 * space.sunSecondaryGlareVisibility) + ")");
    gradient.addColorStop(1.0, "rgba(214, 72, 63, 0.0)");

    c.fillStyle = gradient;
    Utils.drawCircle(c, pos.x, pos.y, this.r * 3);
    c.fill();

    c.fillStyle = "#fff";
    Utils.drawCircle(c, pos.x, pos.y, this.r);
    c.fill();
};


Sun.prototype.drawGlareOnObject = function(object, scale) {

    if(space.introFlip === 1.0 || object.id === 0) {

        var objPos = object.getPos();
        var deltaX = objPos.x - this.pos.x;
        var deltaY = objPos.y - this.pos.y;
        if((deltaX * deltaX) + (deltaY * deltaY) < (((5 * this.r) + object.r) * ((5 * this.r) + object.r))) {
            Utils.drawCircle(c, objPos.x, objPos.y, object.r * scale);
            c.fill();
        }

    }
};
