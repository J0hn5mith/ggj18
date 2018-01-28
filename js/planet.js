function Planet(id, pos, r, type) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;

    this.type = type;

    this.scale = this.r / 50;

    this.angle = 0;

    this.orbitRadius = 500; // TODO
}


Planet.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


Planet.prototype.setAngle = function(angle) {
    this.angle = angle;
};


Planet.prototype.draw = function(lightingSun) {

    var toSun = lightingSun.pos.subtract(this.pos);
    var lightingAngle = Utils.limit(toSun.norm() / this.orbitRadius, 0, 1.0);
    var normal = toSun.normalize();

    c.save();
    c.translate(this.pos.x, this.pos.y);
    c.scale(this.scale, this.scale);

    c.save();
    c.rotate(this.angle);
    var scaling = this.scale * Game.scaleX;
    if(scaling < 0.25) {
        Img.drawCustom("planets", this.type * 30, 180, 30, 30, -60, -60, 120, 120);
    } else if(scaling < 0.5) {
        Img.drawCustom("planets", this.type * 60, 120, 60, 60, -60, -60, 120, 120);
    } else {
        Img.drawCustom("planets", this.type * 120, 0, 120, 120, -60, -60, 120, 120);
    }
    c.restore();

    var gradient;
    if(lightingAngle < 1.0) {
        var showRadius = 53.5 * Interpolate.quadOut(lightingAngle);
        var centerExpansion = Interpolate.quadIn(Interpolate.quadIn(lightingAngle)) * 1600;
        var gradientCenter = normal.multiply(-showRadius - centerExpansion);
        if(this.pos.x < lightingSun.pos.x) {
            gradient = c.createRadialGradient(gradientCenter.x, gradientCenter.y, 51 + centerExpansion, gradientCenter.x, gradientCenter.y, 55.5 + centerExpansion);
        } else {
            gradient = c.createRadialGradient(-gradientCenter.x, -gradientCenter.y, 55.5 + centerExpansion, -gradientCenter.x, -gradientCenter.y, 51 + centerExpansion);
        }

    } else {
        gradient = c.createLinearGradient(normal.x * -2.5, normal.y * -2.5, normal.x * 2, normal.y * 2);
    }

    gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.85)");
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    c.fillStyle = gradient;

    Utils.drawCircle(c, 0, 0, 51);
    c.fill();


    c.restore();
};
