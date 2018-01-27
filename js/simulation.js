const F = 0.6674;

function Colors(){};
Colors.GREEN_DARK = '#004845  ';
Colors.GREEN_LIGHT = '#0f6f60';
Colors.RED_DARK = '#9f292f  ';
Colors.RED_LIGHT = '#d6483f  ';
Colors.PINK = '#fea58b';
Colors.BLUE_DARK = '#002748';
Colors.BLUE_LIGHT = '#0f4e6f';
Colors.YELLOW_DARK = '#d6933f  ';
Colors.YELLOW_LIGHT = '#fedf8b';
Colors.BROWN_LIGHT = '#9f5e29  ';


function TargetPlanet(x, y, r, v, collisionHandler) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = Colors.RED_DARK;
    this.collisionHandler = collisionHandler;
}

function HomePlanet(pos, r) {
    this.pos = pos;
    this.r = r;
    this.color = Colors.GREEN_DARK;
}

HomePlanet.prototype.draw = function(delta) {
    c.fillStyle = this.color;
    Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
}

function Level(startPosition, celestialObjects, target){
    this.startPosition = startPosition;
    this.celestialObjects = celestialObjects;
    this.target = target;
}

function Simulation(level) {
    this.ship = new SpaceShip(
        level.startPosition.x,
        level.startPosition.y,
        45,
        new Vec2(0, 0),
        Colors.GREEN_LIGHT
        
    );
    this.start = new HomePlanet(level.startPosition, 50);
    this.target = level.target;
    this.co = level.celestialObjects;

    this.gravity = false;
    this.antiGravity = false;
}

Simulation.prototype.show = function() {
    this._register_keys();
}

Simulation.prototype._update_gravity = function(delta) {
    total_ac = new Vec2(0,0);
    _.each(this.co, (co) => {
        pos_delta = co.pos.subtract(this.ship.pos);
        distance = pos_delta.norm();
        direction = pos_delta.normalize();
        force = F * (co.mass * this.ship.mass)/distance;
        total_ac = total_ac.add(direction.multiply(force * this.gravity));
    });
    this.ship.v = this.ship.v.add(total_ac.multiply(delta));
}

Simulation.prototype._test_collision = function(o1, o2) {
    const pos_delta = o1.pos.subtract(o2.pos);
    distance = pos_delta.norm();
    return distance < o1.r + o2.r;
}
Simulation.prototype._update_collision = function(delta) {
    collision = false;
    _.each(this.co, (co) => {
        collision = collision || this._test_collision(co, this.ship);
        _.each(co.orbitingObjects, (oo) => {
            if(this._test_collision(oo, this.ship)) {
                oo.collisionHandler(this.ship);
            };
        });
    });
    if(collision) {
        this.ship.v = this.ship.v.multiply(-1);
    }
    if(this._test_collision(this.ship, this.target)) {
        this.target.collisionHandler(this.ship);
    }
}

Simulation.prototype.update = function(delta) {
    if(this.gravity !== 0) {
        this._update_gravity(delta);
    }
    _.each(this.co, (co) => {
        co.update(delta);
        co.pos = co.pos.add(co.v.multiply(delta));
    });
    this.ship.pos = this.ship.pos.add(this.ship.v.multiply(delta));
    this._update_collision(delta);
};

Simulation.prototype._draw_co = function(co) {
    c.fillStyle = co.color;
    Utils.drawCircle(c, co.pos.x, co.pos.y, co.r);
    c.fill();
}

Simulation.prototype.draw = function() {
    this.ship.draw();
    this._draw_co(this.target);
    this.start.draw();
    _.each(this.co, (co) => {
        co.draw();
    });
}

Simulation.prototype._accellerateShip = function() {
    dir = Mouse.pos.subtract(this.ship.pos);
    this.ship.v = dir;
}

Simulation.prototype._register_keys = function() {
    Keyboard.registerKeyDownHandler(Keyboard.G, () => this.gravity = 1);
    Keyboard.registerKeyUpHandler(Keyboard.G, () => this.gravity = 0);
    Keyboard.registerKeyDownHandler(Keyboard.H, () => this.gravity = -1);
    Keyboard.registerKeyUpHandler(Keyboard.H, () => this.gravity = 0);

    Mouse.left.registerUpCallback('shoot', () => {
        this._accellerateShip()
    });
}
