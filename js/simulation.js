const F = 0.6674 * 2; 
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
    this.markerColor = Colors.RED_LIGHT;
    this.markerRadius = 2.0; // 1 = same radius as planet
    this.markerWidth = 0.1;
    this.markerPuls = 0;
}

TargetPlanet.prototype.show = function(pos, r) {
    this.drawable = space.addPlanet(this.pos, this.r, 5);
};

TargetPlanet.prototype.draw = function(delta) {
    c.globalAlpha=0.5;
    this._drawMarker(delta);
    c.globalAlpha=1;
}

TargetPlanet.prototype._drawMarker = function(delta) {
    c.fillStyle = this.markerColor;
    rotation = (Utils.angle(this.pos.x, this.pos.y, Mouse.pos.x, Mouse.pos.y)+1.9)/Math.PI;
    const currentMarkerRadius = this.markerRadius + Math.sin(this.markerPuls++/40)/4.5;
    Utils.drawRing(
        c,
        this.pos.x,
        this.pos.y,
        this.r * currentMarkerRadius,
        this.r * (currentMarkerRadius + this.markerWidth),
        0.0,
        rotation
    );
    c.fill();
}


function HomePlanet(pos, r) {
    this.pos = pos;
    this.r = 30;
    this.color = Colors.GREEN_DARK;
    this.markerColor = Colors.GREEN_LIGHT;
};

HomePlanet.prototype.show = function(pos, r) {
    this.drawable = space.addPlanet(this.pos, this.r, 1);
};

HomePlanet.prototype._drawMarker = function(delta) {
    c.fillStyle = this.markerColor;
    rotation = (Utils.angle(this.pos.x, this.pos.y, Mouse.pos.x, Mouse.pos.y)+1.9)/Math.PI;
    Utils.drawRing(c, this.pos.x, this.pos.y, this.r * 1.3, this.r * 1.4, 0.2, rotation);
    c.fill();
}

limitDistanceLength = function(start, end, maxLength, minLength) {
    minLength = minLength || 0;
    delta = end.subtract(start)
    originalLength = delta.norm()
    length = Utils.limit(originalLength, minLength, maxLength)
    return delta.normalize().multiply(length);
}

HomePlanet.prototype._drawAimArrow = function(delta) {
    lineEnd = this.pos.add(limitDistanceLength(this.pos, Mouse.pos, 250));
    c.strokeStyle = this.markerColor;
    c.setLineDash([10, 10]);
    c.lineWidth = 3.5;
    c.beginPath();
    c.moveTo(this.pos.x, this.pos.y);
    c.lineTo(lineEnd.x, lineEnd.y);
    c.stroke();
}

HomePlanet.prototype.draw = function() {
    c.globalAlpha=0.5;
    this._drawMarker();
    this._drawAimArrow();
    c.globalAlpha=1;
    c.fillStyle = this.color;
    //Utils.drawCircle(c, this.pos.x, this.pos.y, this.r);
    c.fill();
}

function Simulation(level) {
    this.ship = new SpaceShip(
        level.startPosition.x,
        level.startPosition.y,
        new Vec2(0, 0),
        Colors.GREEN_LIGHT
    );
    this.start = new HomePlanet(level.startPosition, 50);
    this.target = level.target;
    this.co = level.celestialObjects;

    this.gravity = false;
    this.antiGravity = false;
    this.started = false;
    this.pause = false;

    space.reset();
    for(var i = 0; i < this.co.length; i++) {
        this.co[i].initDrawable();
    }
}

Simulation.prototype.show = function() {
    this._register_keys();
    this.start.show();
    this.target.show();
};

Simulation.prototype._updateConstraints = function(delta) {
    if (this.ship.pos.x < 0 || this.ship.pos.x > Settings.Size.WIDTH_IN_UNITS  ||
        this.ship.pos.y < 0 || this.ship.pos.y > Settings.Size.HEIGHT_IN_UNITS
    ) {
        console.log("The deep space has swallowed the ship");
        gameState.shipDestroyed();
    }

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
};

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
        gameState.shipDestroyed();
    }
    if(this._test_collision(this.ship, this.target)) {
        this.target.collisionHandler(this.ship);
    }
};

Simulation.prototype.update = function(delta) {
    if (this.pause) {
        return;
    };
    this._updateConstraints(delta);
    if(this.gravity !== 0 && this.started) {
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
    if(gameState.tutorialMode === 0){
        if(this.started) {
            this.ship.draw();
        } else {
            this.start.draw();
        }

        this.target.draw();
    }
}

Simulation.prototype._accellerateShip = function() {
    dir = limitDistanceLength(this.start.pos, Mouse.pos, 300, 150);
    this.ship.v = dir.multiply(2);
}

Simulation.prototype._register_keys = function() {
    Keyboard.registerKeyDownHandler(Keyboard.G, () => this.gravity = 1);
    Keyboard.registerKeyUpHandler(Keyboard.G, () => this.gravity = 0);
    Keyboard.registerKeyDownHandler(Keyboard.H, () => this.gravity = -1);
    Keyboard.registerKeyUpHandler(Keyboard.H, () => this.gravity = 0);

    Mouse.left.registerUpCallback('shoot', () => {
        if(!this.started && gameState.tutorialMode === 0) {
            this.started = true;
            this._accellerateShip()
        }
        if(gameState.tutorialMode > 0) {
            gameState.tutorialMode++;
            if (gameState.tutorialMode >= 8) {
                gameState.tutorialMode = 0;
            }
        }

    });
}
