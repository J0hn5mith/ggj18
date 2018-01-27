function Sun(id, pos, r) {

    this.id = id;

    this.pos = new Vec2(pos.x, pos.y);

    this.r = r;
}


Sun.prototype.setPos = function(pos) {
    this.pos.x = pos.x;
    this.pos.y = pos.y;
};


Sun.prototype.draw = function() {

    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, this.r, this.pos.x, this.pos.y, this.r * 3);
    gradient.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.06, "rgba(254, 223, 139, 0.6)");
    gradient.addColorStop(0.12, "rgba(214, 72, 63, 0.5)");
    gradient.addColorStop(1.0, "rgba(214, 72, 63, 0.0)");

    c.fillStyle = gradient;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r * 3);
    c.fill();

    c.fillStyle = "#fff";
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
};


Sun.prototype.drawGlare = function() {
    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, this.r, this.pos.x, this.pos.y, this.r * 5);
    gradient.addColorStop(0.0, "rgba(214, 72, 63, 0.2)");
    gradient.addColorStop(1.0, "rgba(214, 72, 63, 0.0)");

    c.fillStyle = gradient;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r * 5);
    c.fill();
};