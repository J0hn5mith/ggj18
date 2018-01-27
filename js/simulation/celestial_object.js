function CelestialObject(x, y, r, v, color) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
    this.orbitingObjects = [];
}


CelestialObject.prototype.update = function(delta) {
    _.each(this.orbitingObjects, (oo) => {
        oo.update(delta);
    });
};


CelestialObject.prototype.draw = function(delta) {
    c.fillStyle = this.color;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
    _.each(this.orbitingObjects, (oo) => {
        oo.draw();
    });
};
