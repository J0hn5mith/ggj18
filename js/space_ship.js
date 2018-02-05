function SpaceShip(pos) {

    this.pos = pos.copy();
    this.radius = 20;
    this.v = new Vec2(0, 0);
    this.mass = 300;

    this.particleSystem = new ParticleSystem(1, {
        emitter : new Vec3(225, 300, 0),
        emitterSize : { x : 0.001, y : 0.001, z : 0.0 },
        v : { x : { min : -50.0, max : 50.0 }, y : { min : -50.0, max : 50.0 }, z : { min : 0.0, max : 0.0 }},
        a : { x : { min : 0.0, max : 0.0 }, y : { min : 0.0, max : 0.0 }, z : { min : 0.0, max : 0.0 }},
        friction : { x : 0.0, y : 0.0, z : 0.0 },
        life : { min : 1.5, max : 1.5 }
    });

    this.particleSystemTrain = new ParticleSystem(2, {
        particlesPerTick: 20,
        emitter : new Vec3(225, 300, 0),
        emitterSize : { x : 1., y : 0.001, z : 1.0 },
        v : { x : { min : -20.0, max : 20.0 }, y : { min : -20.0, max : 20.0 }, z : { min : 0.0, max : 0.0 }},
        a : { x : { min : -3.0, max : 3.0 }, y : { min : -3.0, max : 3.0 }, z : { min : 0.0, max : 0.0 }},
        friction : { x : 0.0, y : 0.0, z : 0.0 },
        life : { min : 0.2, max : 1.0 }
    });

    this.bodyAni = Utils.randFloat(0, TWO_PI);
    this.leftArmAni = Utils.randFloat(0, TWO_PI);
    this.rightArmAni = Utils.randFloat(0, TWO_PI);
}


SpaceShip.prototype.getObjectRadius = function() {
    return this.radius;
};


SpaceShip.prototype.isOutOfLevel = function() {
    return this.pos.x < -this.radius || this.pos.x > Game.width + this.radius ||
        this.pos.y < -this.radius || this.pos.y > Game.height + this.radius;
};


SpaceShip.prototype.draw = function() {
    this.particleSystem.setEmitter(this.pos);
    this.particleSystem.setV(
        { x : { min : this.v.x + -50.0, max : this.v.x + 50.0 }, y : { min : this.v.y + -50.0, max : this.v.y + 50.0 }, z : { min : 0.0, max : 0.0 }},
    );
    this.particleSystem.draw();
    this.particleSystemTrain.setEmitter(this.pos);
    this.particleSystemTrain.draw();

    this.bodyAni += Timer.delta * 2.3;
    this.leftArmAni += Timer.delta * 3.8;
    this.rightArmAni += Timer.delta * 4.2;
    if(this.bodyAni > TWO_PI) {
        this.bodyAni -= TWO_PI;
    }
    if(this.leftArmAni > TWO_PI) {
        this.leftArmAni -= TWO_PI;
    }
    if(this.rightArmAni > TWO_PI) {
        this.rightArmAni -= TWO_PI;
    }

    c.save();
    c.translate(this.pos.x, this.pos.y);
    c.scale(0.75, 0.75);
    c.rotate(Math.sin(this.bodyAni));
    c.translate(-60, -60);
    Img.draw("alienBody", 0, 0);

    c.save();
    c.translate(45, 53);
    c.rotate(Math.sin(this.leftArmAni));
    c.translate(-45, -53);
    Img.draw("alienLeftArm", 0, 0);
    c.restore();

    c.save();
    c.translate(77, 54);
    c.rotate(Math.sin(this.rightArmAni));
    c.translate(-77, -54);
    Img.draw("alienRightArm", 0, 0);
    c.restore();

    c.restore();
};
