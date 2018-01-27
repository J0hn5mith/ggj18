function BlackHole(id, pos, r) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;
}


BlackHole.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


BlackHole.prototype.drawHalo = function() {

    var pointX = Math.round(this.pos.x * Game.scaleX) + Game.frameOffsetX;
    var pointY = Math.round(this.pos.y * Game.scaleY) + Game.frameOffsetY;
    var data = c.getImageData(pointX - 2, pointY - 2, 5, 5).data;
    var r = 0;
    var g = 0;
    var b = 0;
    for(var i = 0; i < 100; i += 4) {
        r += data[i    ];
        g += data[i + 1];
        b += data[i + 2];
    }
    r /= 25;
    g /= 25;
    b /= 25;
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