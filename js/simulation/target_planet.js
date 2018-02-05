function TargetPlanet(x, y, planetRadius, collisionHandler) {

    this.pos = new Vec2(x, y);
    this.planetRadius = planetRadius;

    this.collisionHandler = collisionHandler;
    this.markerAnimation = 0;
}


TargetPlanet.prototype.initDrawable = function() {
    this.drawable = space.addPlanet(this.pos, this.planetRadius, 5, 600);
};


TargetPlanet.prototype.getObjectRadius = function() {
    return this.planetRadius;
};


TargetPlanet.prototype.drawMarker = function() {
    this.markerAnimation += Timer.delta * 3;
    if(this.markerAnimation > TWO_PI) {
        this.markerAnimation -= TWO_PI;
    }

    c.fillStyle = Colors.RED_LIGHT;
    var pulse = 10 + (5 * Math.abs(Math.sin(this.markerAnimation)));
    Utils.drawRing(c, this.pos.x, this.pos.y, this.planetRadius + pulse, this.planetRadius + pulse + 5, 0.0, Math.PI * 2);
    c.fill();
};
