function BlackHole(id, pos, r) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;

    this.isOld = false;
}


BlackHole.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


BlackHole.prototype.getPos = function() {
    if(this.isOld) {
        return this.getOldPos();
    }
    if(intro.playing) {
        var clone = this.pos.copy();
        clone.x = Game.centerX + (Interpolate.quad(space.introFlip) * (this.pos.x - Game.centerX));
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


BlackHole.prototype.getOldPos = function() {
    var clone = this.pos.copy();
    clone.x = (0.5 - background.transAni) * Game.width;
    clone.x += (1.0 - background.transAni) * (this.pos.x - Game.centerX);
    return clone;
};


BlackHole.prototype.drawHalo = function() {

    var pos = this.getPos();

    var pointX = Math.round((pos.x + space.backgroundOffsetX) * Game.scaleX) + Game.frameOffsetX;
    var pointY = Math.round(pos.y * Game.scaleY) + Game.frameOffsetY;
    var startX = Utils.limit(pointX - 2, 0, 3839);
    var endX = Utils.limit(pointX + 2, 0, 3839);
    var startY = Utils.limit(pointY - 2, 0, 1079);
    var endY = Utils.limit(pointY + 2, 0, 1079);

    var data = space.backgroundData;

    var r = 0;
    var g = 0;
    var b = 0;
    var sampleCounter = 0;

    var x;
    var y;
    var i;
    for(x = startX; x <= endX; x++) {
        for(y = startY; y <= endY; y++) {
            i = ((y * 3840) + x) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            sampleCounter++;
        }
    }
    r /= sampleCounter;
    g /= sampleCounter;
    b /= sampleCounter;
    var brightness = r / 255;
    if(brightness < g / 255) {
        brightness = g / 255;
    }
    if(brightness < b / 255) {
        brightness = b / 255;
    }

    var colorMultiplier = 0.5;
    if(brightness < 0.03) {
        colorMultiplier = brightness / 0.06;
    }

    if(brightness < 0.0001) {
        r = 0;
        g = 0;
        b = 0;
    } else {
        r = Utils.limit(Math.round(r * colorMultiplier / brightness), 0, 255);
        g = Utils.limit(Math.round(g * colorMultiplier / brightness), 0, 255);
        b = Utils.limit(Math.round(b * colorMultiplier / brightness), 0, 255);
    }

    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, this.r, this.pos.x, this.pos.y, this.r * 3);
    gradient.addColorStop(0.0, "rgba(255, 255, 255, 0.98)");
    gradient.addColorStop(0.3, "rgba(" + r + ", " + g + ", " + b + ", " + (0.3 * brightness) + ")");
    gradient.addColorStop(1, "rgba(" + r + ", " + g + ", " + b + ", 0.0)");

    c.fillStyle = gradient;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r * 3);
    c.fill();
};


BlackHole.prototype.draw = function() {
    c.fillStyle = "#000";
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
};


BlackHole.prototype.isStarAffected = function(star) {
    var deltaX = star.x - this.pos.x;
    var deltaY = star.y - this.pos.y;
    return (deltaX * deltaX) + (deltaY * deltaY) < (9 * this.r * this.r);
};


BlackHole.prototype.affectStar = function(star) {
    var delta = star.subtract(this.pos);
    var distance = delta.norm();
    var normal = delta.normalize();
    var affectedness = 1.0 - (distance / (3 * this.r));
    return this.pos.add(normal.multiply(this.r * (3 - (2 * Interpolate.sinOut(affectedness)))));
};
