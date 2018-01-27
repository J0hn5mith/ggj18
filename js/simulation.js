const F = 0.6674;

function CelestialObject(x, y, r, v, color) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
}

function OrbitingObject(co, x, y, r, v, color) {
    this.co = co;
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
}

function SpaceShip(x, y, r, v, color) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
}

function Target(x, y, r, v, color, collision_handler) {
    this.pos = new Vec2(x,y);
    this.r = r;
    this.v = v;
    this.color = color;
    this.mass = 300;
    this.collision_handler = collision_handler;
}


function Simulation() {
    this.ship = new SpaceShip(100, 500, 20, new Vec2(100, 100), '#11ff01');
    this.target = new Target(1500, 500, 20, new Vec2(000, 0), '#11f001', (ship) => {
        console.log("You Win!");
    });
    this.co = [ //Celestial Objects
        //new CelestialObject(500, 800, 50, 00, '#ffff01'),
        new CelestialObject(1000, 500, 50, new Vec2(0,0), '#ff1f00'),
    ];

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
        total_ac = total_ac.add(direction.multiply(force));
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
    });
    if(collision) {
        this.ship.v = this.ship.v.multiply(-1);
    }
    if(this._test_collision(this.ship, this.target)) {
        this.target.collision_handler(this.ship);
    }
}

Simulation.prototype.update = function(delta) {
    if(this.gravity) {
        this._update_gravity(delta);
    }
    _.each(this.co, (co) => {
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
    this._draw_co(this.ship);
    this._draw_co(this.target);
    _.each(this.co, (co) => {
        this._draw_co(co);
    });

}

Simulation.prototype._register_keys = function() {

    Keyboard.registerKeyUpHandler(Keyboard.G, () => {
        console.log('up');
        this.gravity = false;
    });

    Keyboard.registerKeyDownHandler(Keyboard.G, () => {
        console.log('down');
        this.gravity = true;
    });
}
