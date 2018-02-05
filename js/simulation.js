function Simulation(level) {

    this.ship = new SpaceShip(level.home.pos);
    this.home = level.home;
    this.target = level.target;
    this.celestialObjects = level.celestialObjects;

    this.gravityEffect = 0.0;

    this.pause = true;
    this.shipFired = false;
}


Simulation.F = 0.6674 * 2;


Simulation.prototype.start = function() {
    Sound.stop("ingame_fun");
    Sound.fadeVolume ("ingame_serious", 0, 50, 2);
};


Simulation.prototype.updateGravity = function() {

    var totalAc = new Vec2(0,0);
    _.each(this.celestialObjects, (co) => {
        var pos_delta = co.pos.subtract(this.ship.pos);
        var distance = pos_delta.norm();
        var direction = pos_delta.normalize();
        var force = Simulation.F * (co.mass * this.ship.mass) / distance;
        totalAc = totalAc.add(direction.multiply(force * this.gravityEffect));
    });
    this.ship.v = this.ship.v.add(totalAc.multiply(Timer.delta));

};


Simulation.prototype.collide = function(o1, o2) {
    var pos_delta = o1.pos.subtract(o2.pos);
    var distance = pos_delta.norm();
    return distance < o1.getObjectRadius() + o2.getObjectRadius();
};


Simulation.prototype.updateCollisions = function() {
    _.each(this.celestialObjects, (co) => {
        if(this.collide(co, this.ship)) {
            gameState.shipDestroyed();
            return;
        }
        _.each(co.orbitingObjects, (oo) => {
            if(this.collide(oo, this.ship)) {
                oo.collisionHandler();
            }
        });
    });
    if(this.collide(this.ship, this.target)) {
        this.target.collisionHandler();
    }
};


Simulation.prototype.update = function() {

    if(this.pause && levelManager.currentLevelNumber > 0 && background.transAni > 0.9999) {
        this.pause = false;
        if(levelManager.currentLevelNumber === 1 && hud.tutorialMode === 9) {
            hud.flipTutorial();
        }
    }

    if(this.ship.isOutOfLevel()) {
        gameState.shipDestroyed();
    }

    var gPressed = Keyboard.isPressed(Keyboard.G);
    var hPressed = Keyboard.isPressed(Keyboard.H);

    this.gravityEffect = 0.0;
    if(gPressed && !hPressed) {
        this.gravityEffect = 1.0;
    } else if(hPressed && !gPressed) {
        this.gravityEffect = -1.0;
    }

    if(this.gravityEffect !== 0.0) {
        this.updateGravity();
    }

    _.each(this.celestialObjects, (co) => {
        co.update();
    });

    if(!this.pause && this.shipFired) {
        this.ship.pos = this.ship.pos.add(this.ship.v.multiply(Timer.delta));
    }

    this.updateCollisions();
};


Simulation.prototype.fireShip = function() {

    if(!this.pause) {

        var speedLimit = (levelManager.currentLevelNumber === 0) ? 120 : 220;
        var dir = this.limitVectorSize(this.home.pos, Mouse.pos, 100, speedLimit);
        this.ship.v = dir.multiply((levelManager.currentLevelNumber === 0) ? 2.0 : 3.0);

        this.shipFired = true;

        Sound.stop("ingame_serious");
        Sound.setVolume ("ingame_serious", 0);
        Sound.play("ingame_fun");
        Sound.setVolume ("ingame_fun", 50);
    }
};


Simulation.prototype.limitVectorSize = function(start, end, minLength, maxLength) {
    var delta = end.subtract(start);
    var originalLength = delta.norm();
    var length = Utils.limit(originalLength, minLength, maxLength);
    return delta.normalize().multiply(length);
};

