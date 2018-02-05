function Sun(id, pos, r) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;

    this.visibility = 1.0;

    this.isOld = false;
}


Sun.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


Sun.prototype.getPos = function() {
    if(this.isOld) {
        return this.getOldPos();
    }
    if(intro.playing) {
        var clone = this.pos.copy();
        clone.x = Game.centerX + (Interpolate.quad(intro.cameraPan) * (this.pos.x - Game.centerX));
        return clone;

    } else if(levelManager.currentLevelNumber > 0 && background.transAni < 1.0) {
        var clone2 = this.pos.copy();
        clone2.x = (1.5 - background.transAni) * Game.width;
        clone2.x += background.transAni * (this.pos.x - Game.centerX);
        return clone2;

    } else {
        return this.pos;
    }
};


Sun.prototype.getOldPos = function() {
    var clone = this.pos.copy();
    clone.x = (0.5 - background.transAni) * Game.width;
    clone.x += (1.0 - background.transAni) * (this.pos.x - Game.centerX);
    return clone;
};


Sun.prototype.checkCover = function(object) {
    var objPos = object.getPos();
    var dist = this.pos.subtract(objPos).norm();
    var coverRatio = (this.r + dist - object.r) / (2 * this.r);
    coverRatio = Utils.limit(coverRatio, 0.0, 1.0);
    this.visibility *= coverRatio;
};


Sun.prototype.setGlareGradient = function() {

    var alpha = 1.0;
    if(levelManager.currentLevelNumber > 0 && background.transAni < 1.0) {
        if(this.isOld) {
            alpha = 1.0 - background.transAni;
        } else {
            alpha = background.transAni;
        }
    }

    var pos = this.getPos();
    var gradient = c.createRadialGradient(pos.x, pos.y, this.r, pos.x, pos.y, this.r * (3.5 + (1.5 * this.visibility)));
    gradient.addColorStop(0.0, "rgba(214, 72, 63, " + (this.visibility * alpha) + ")");
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

    var alpha = 1.0;
    if(levelManager.currentLevelNumber > 0 && background.transAni < 1.0) {
        if(this.isOld) {
            alpha = 1.0 - background.transAni;
        } else {
            alpha = background.transAni;
        }
    }

    var pos = this.getPos();
    var gradient = c.createRadialGradient(pos.x, pos.y, this.r, pos.x, pos.y, this.r * 3);
    gradient.addColorStop(0.0, "rgba(255, 255, 255, " + (1.0 * alpha) + ")");
    gradient.addColorStop(0.06, "rgba(254, 223, 139, " + (0.6 * intro.sunSecondaryGlareVisibility * alpha) + ")");
    gradient.addColorStop(0.12, "rgba(214, 72, 63, " + (0.3 * intro.sunSecondaryGlareVisibility * alpha) + ")");
    gradient.addColorStop(1.0, "rgba(214, 72, 63, 0.0)");

    c.fillStyle = gradient;
    Utils.drawCircle(c, pos.x, pos.y, this.r * 3);
    c.fill();

    c.fillStyle = "rgba(255, 255, 255, " + (1.0 * alpha) + ")";
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
