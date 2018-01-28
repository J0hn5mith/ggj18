function OrbitingObject(co, r, orbitRadius, orbitingSpeed, color, collisionHandler, offset) {
    offset = offset || 0.5;
    this.co = co;
    this.pos = co.pos;
    this.r = r;
    this.color = color;
    this.mass = 300;
    this.orbitRadius = orbitRadius  || 300;
    this.orbitAngle = offset;
    this.orbitingSpeed = orbitingSpeed;
    this.collisionHandler = collisionHandler;

    this.drawable = null;
};


OrbitingObject.prototype.initDrawable = function() {
    this.drawable = space.addPlanet(this.pos, this.r, 2, this.orbitRadius);
};


OrbitingObject.prototype.update = function(delta) {
    this.orbitAngle += this.orbitingSpeed * delta;
    if(this.orbitAngle > TWO_PI) {
        this.orbitAngle -= TWO_PI;
    } else if(this.orbitAngle < -TWO_PI) {
        this.orbitAngle += TWO_PI;
    }
    var orbit = new Vec2(this.orbitRadius, 0);
    orbit = orbit.rotate(this.orbitAngle);
    this.pos = this.co.pos.add(orbit);

    this.drawable.setPos(this.pos);
    this.drawable.setAngle(this.orbitingAngle);
};


OrbitingObject.prototype.draw = function(delta) {
    c.fillStyle = this.color;
    //Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
};
