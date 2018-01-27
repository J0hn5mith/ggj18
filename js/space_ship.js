function SpaceShip(x, y, v, color) {
    this.pos = new Vec2(x,y);
    this.r = 20;
    this.v = v;
    this.color = color;
    this.mass = 300;

    this.particleSystem = new ParticleSystem(1, {
        emitter : new Vec3(225, 300, 0),
        emitterSize : { x : 0.001, y : 0.001, z : 0.0 },
        v : { x : { min : -50.0, max : 50.0 }, y : { min : -50.0, max : 50.0 }, z : { min : 0.0, max : 0.0 }},
        a : { x : { min : 0.0, max : 0.0 }, y : { min : 0.0, max : 0.0 }, z : { min : 0.0, max : 0.0 }},
        friction : { x : 0.0, y : 0.0, z : 0.0 },
        life : { min : 0.5, max : 0.5 }
    });
}

SpaceShip.prototype.draw = function() {
    this.particleSystem.setEmitter(this.pos);
    this.particleSystem.draw();
    this.particleSystem.setV(
        { x : { min : this.v.x + -50.0, max : this.v.x + 50.0 }, y : { min : this.v.y + -50.0, max : this.v.y + 50.0 }, z : { min : 0.0, max : 0.0 }},
    );

    c.fillStyle = this.color;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
}
