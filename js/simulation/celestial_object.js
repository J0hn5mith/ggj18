CO_SUN = 0;
CO_BLACK_HOLE = 1;

function CelestialObject(x, y, r, v, color, type) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
    this.orbitingObjects = [];
    this.drawable = null;
    this.type = type || CO_SUN;
}


CelestialObject.prototype.initDrawable = function() {
    if(this.type === CO_SUN) {
        this.drawable = space.addSun(this.pos, this.r);
    } else {
        this.drawable = space.addBlackHole(this.pos, this.r);
    }
    _.each(this.orbitingObjects, (oo) => {
        oo.initDrawable();
    });
};


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
