CO_SUN = 0;
CO_BLACK_HOLE = 1;


function CelestialObject(x, y, objectRadius, type, orbitingObjects) {

    this.pos = new Vec2(x, y);
    this.objectRadius = objectRadius;

    this.mass = 300;

    this.orbitingObjects = orbitingObjects;
    for(var i = 0; i < this.orbitingObjects.length; i++) {
        this.orbitingObjects[i].setParentCo(this);
    }

    this.drawable = null;

    this.type = type;

}


CelestialObject.prototype.initDrawable = function() {

    if(this.type === CO_SUN) {
        this.drawable = space.addSun(this.pos, this.objectRadius);
    } else {
        this.drawable = space.addBlackHole(this.pos, this.objectRadius);
    }

    _.each(this.orbitingObjects, (oo) => {
        oo.initDrawable();
    });
};


CelestialObject.prototype.getObjectRadius = function() {
    return this.objectRadius;
};


CelestialObject.prototype.update = function() {

    _.each(this.orbitingObjects, (oo) => {
        oo.update();
    });

};


CelestialObject.prototype.drawDebug = function(delta) {

    c.fillStyle = "#f00";
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.objectRadius);
    c.fill();

    _.each(this.orbitingObjects, (oo) => {
        oo.drawDebug();
    });

};
