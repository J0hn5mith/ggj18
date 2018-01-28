function Planet(id, pos, r, type, orbitRadius) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;

    this.type = type;

    this.scale = this.r / 50;

    this.angle = 0;

    this.orbitRadius = orbitRadius;
}


Planet.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


Planet.prototype.setAngle = function(angle) {
    this.angle = angle;
};


Planet.prototype.getPos = function() {
    if(space.playingIntro) {
        var clone = this.pos.copy();
        clone.x = Game.centerX + (Interpolate.quad(space.introFlip) * (this.pos.x - Game.centerX));
        return clone;
    } else {
        return this.pos;
    }
};


Planet.prototype.draw = function(lightingSun) {
    var pos = this.getPos();

    var toSun = lightingSun.getPos().subtract(pos);
    var lightingAngle = Utils.limit(toSun.norm() / this.orbitRadius, 0, 1.0);
    var normal = toSun.normalize();

    c.save();
    c.translate(pos.x, pos.y);
    c.scale(this.scale, this.scale);

    c.save();
    c.rotate(this.angle);

    if(space.introFlip < 1.0 && this.id !== 0) {
        c.globalAlpha = Utils.limit(space.introFlip * 3.0 - 1.0, 0.0, 1.0);
    }

    var scaling = this.scale * Game.scaleX;
    if(scaling < 0.25) {
        Img.drawCustom("planets", this.type * 30, 180, 30, 30, -60, -60, 120, 120);
    } else if(scaling < 0.5) {
        Img.drawCustom("planets", this.type * 60, 120, 60, 60, -60, -60, 120, 120);
    } else {
        Img.drawCustom("planets", this.type * 120, 0, 120, 120, -60, -60, 120, 120);
    }
    c.restore();

    if(space.introFlip < 1.0 && this.id !== 0) {
        c.globalAlpha = 1.0;
    }

    var gradient;
    if(lightingAngle < 1.0) {
        var showRadius = 53.5 * Interpolate.quadOut(lightingAngle);
        var centerExpansion = Interpolate.quadIn(Interpolate.quadIn(lightingAngle)) * 1600;
        var gradientCenter = normal.multiply(-showRadius - centerExpansion);
        if(pos.x <= lightingSun.getPos().x) {
            gradient = c.createRadialGradient(gradientCenter.x, gradientCenter.y, 51 + centerExpansion, gradientCenter.x, gradientCenter.y, 55.5 + centerExpansion);
        } else {
            gradient = c.createRadialGradient(-gradientCenter.x, -gradientCenter.y, 55.5 + centerExpansion, -gradientCenter.x, -gradientCenter.y, 51 + centerExpansion);
        }

    } else {
        gradient = c.createLinearGradient(normal.x * -2.5, normal.y * -2.5, normal.x * 2, normal.y * 2);
    }

    if(space.introFlip < 1.0 && this.id !== 0) {
        gradient.addColorStop(0.0, "rgba(0, 0, 0, " + ((1.0 - (0.15 * space.sunRise)) * Utils.limit((space.introFlip * 4.5) - 1.5, 0.0, 1.0)) + ")");
    } else {
        gradient.addColorStop(0.0, "rgba(0, 0, 0, " + (1.0 - (0.15 * space.sunRise)) + ")");
    }
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    c.fillStyle = gradient;

    Utils.drawCircle(c, 0, 0, 51);
    c.fill();

    c.restore();
};
