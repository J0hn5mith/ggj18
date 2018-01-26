const F = 0.6674;

function CelestialObject(x, y, r, v, color) {
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


function Simulation() {

    this.ship = new SpaceShip(500, 200, 20, new Vec2(120, 0), '#11ff01');

    this.co = [ //Celestial Objects
        //new CelestialObject(500, 800, 50, 00, '#ffff01'),
        new CelestialObject(500, 500, 50, new Vec2(0,0), '#ff1f00'),
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

Simulation.prototype.update = function(delta) {
    if(this.gravity) {
        this._update_gravity(delta);
    }
    _.each(this.co, (co) => {
        co.pos = co.pos.add(co.v.multiply(delta));
    });
    this.ship.pos = this.ship.pos.add(this.ship.v.multiply(delta));

};

Simulation.prototype._draw_co = function(co) {
    c.fillStyle = co.color;
    Utils.drawCircle(c, co.pos.x, co.pos.y, co.r);
    c.fill();
}

Simulation.prototype.draw = function() {
    this._draw_co(this.ship);
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
