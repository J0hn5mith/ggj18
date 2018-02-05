function OrbitingObject(objectRadius, orbitRadius, orbitingSpeed, orbitOffset, planetType, collisionHandler) {

    this.parentCo = null;

    this.pos = new Vec2(0, 0);
    this.objectRadius = objectRadius;

    this.mass = 300;

    this.orbitRadius = orbitRadius;
    this.orbitingSpeed = orbitingSpeed;
    this.orbitAngle = orbitOffset;

    this.ownRotation = Utils.randFloat(0.0, TWO_PI);
    this.ownRotationSpeed = Utils.randFloat(-PI, PI);

    this.drawable = null;
    this.planetType = planetType;

    this.collisionHandler = collisionHandler;
}


OrbitingObject.prototype.setParentCo = function(parentCo) {
    this.parentCo = parentCo;
};


OrbitingObject.prototype.initDrawable = function() {
    this.drawable = space.addPlanet(this.pos, this.objectRadius, this.planetType, this.orbitRadius);
};


OrbitingObject.prototype.getObjectRadius = function() {
    return this.objectRadius;
};


OrbitingObject.prototype.update = function() {

    this.orbitAngle += this.orbitingSpeed * Timer.delta;

    if(this.orbitAngle > TWO_PI) {
        this.orbitAngle -= TWO_PI;
    } else if(this.orbitAngle < -TWO_PI) {
        this.orbitAngle += TWO_PI;
    }

    var orbit = new Vec2(this.orbitRadius, 0);
    orbit = orbit.rotate(this.orbitAngle);
    this.pos = this.parentCo.pos.add(orbit);

    this.ownRotation += this.ownRotationSpeed * Timer.delta;
    if(this.ownRotation > TWO_PI) {
        this.ownRotation -= TWO_PI;
    } else if(this.ownRotation < -TWO_PI) {
        this.ownRotation += TWO_PI;
    }

    this.drawable.setPos(this.pos);
    this.drawable.setAngle(this.orbitAngle + this.ownRotation);
};


OrbitingObject.prototype.drawDebug = function(delta) {
    c.fillStyle = "#00f";
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.objectRadius);
    c.fill();
};
