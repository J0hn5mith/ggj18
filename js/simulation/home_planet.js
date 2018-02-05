function HomePlanet(x, y, planetRadius) {

    this.pos = new Vec2(x, y);
    this.planetRadius = planetRadius;

    this.drawable = null;
}


HomePlanet.prototype.initDrawable = function() {
    this.drawable = space.addPlanet(this.pos, this.planetRadius, 1, 600);
};


HomePlanet.prototype.drawMarker = function() {
    c.fillStyle = Colors.GREEN_LIGHT;
    var rotation = Utils.angle(this.pos.x, this.pos.y, Mouse.pos.x, Mouse.pos.y) + HALF_PI;
    Utils.drawRing(c, this.pos.x, this.pos.y, this.planetRadius + 10, this.planetRadius + 15, rotation + 0.15, rotation + TWO_PI - 0.15);
    c.fill();
};


HomePlanet.prototype.drawAimArrow = function() {

    var speedLimit = (levelManager.currentLevelNumber === 0) ? 120 : 220;

    var lineStart = this.pos.add(Mouse.pos.subtract(this.pos).normalize().multiply(this.planetRadius + 10));
    var lineEnd = this.pos.add(simulation.limitVectorSize(this.pos, Mouse.pos, this.planetRadius + 10, speedLimit));
    c.strokeStyle = Colors.GREEN_LIGHT;
    c.setLineDash([10, 10]);
    c.lineWidth = 5;
    c.beginPath();
    c.moveTo(lineStart.x, lineStart.y);
    c.lineTo(lineEnd.x, lineEnd.y);
    c.stroke();
};


HomePlanet.prototype.drawDebug = function() {
    c.fillStyle = this.color;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.planetRadius);
    c.fill();
};