function OrbitingObject(co, r, orbitingRadius, orbitingSpeed, color, collisionHandler) {
    this.co = co;
    this.pos = co.pos;
    this.r = r;
    this.color = color;
    this.mass = 300;
    this.orbitingRadius = orbitingRadius  || 300;
    this.orbitAngle = 0.5;
    this.orbitingSpeed = orbitingSpeed;
    this.collisionHandler = collisionHandler;

    this.drawable = space.addBlackHole(this.pos, this.r);
}

OrbitingObject.prototype.update = function(delta) {
    this.orbitAngle += this.orbitingSpeed * delta;
    // TODO test for overflow
    var orbit = new Vec2(this.orbitingRadius, 0);
    orbit = orbit.rotate(this.orbitAngle);
    this.pos = this.co.pos.add(orbit);

    this.drawable.setPos(this.pos);
}

OrbitingObject.prototype.draw = function(delta) {
    c.fillStyle = this.color;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
}
