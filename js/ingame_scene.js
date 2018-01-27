function IngameScene() {}

IngameScene._loadLevels = function() {
    collisionHandler = () => IngameScene.restartLevel();
    const co1 = new CelestialObject(1000, 500, 50, new Vec2(0,0), '#ff1f00');
    oo1 = new OrbitingObject(co1, 20, 100, 3, '#11ff01', collisionHandler);
    oo2 = new OrbitingObject(co1, 20, 200, -2, '#11ff01', collisionHandler);
    co1.orbitingObjects.push(oo1);
    co1.orbitingObjects.push(oo2);

    collisionHandler = () => IngameScene.restartLevel();
    const co2 = new CelestialObject(1000, 900, 50, new Vec2(0,0), '#ff1f00');
    oo1 = new OrbitingObject(co2, 20, 100, 3, '#11ff01', collisionHandler);
    oo2 = new OrbitingObject(co2, 20, 200, -2, '#11ff01', collisionHandler);
    oo3 = new OrbitingObject(co2, 20, 300, 2, '#11ff01', collisionHandler);
    co2.orbitingObjects.push(oo1);
    co2.orbitingObjects.push(oo2);
    co2.orbitingObjects.push(oo3);

    IngameScene.levels = [new Level([co1]), new Level([co2])];
}

IngameScene.show = function() {

    // do stuff before we update and draw this scene for the first time
    IngameScene._loadLevels();
    IngameScene.currentLevel = IngameScene.levels[0]
    simulation = new Simulation(IngameScene.currentLevel);
    simulation.show()
};

IngameScene.restartLevel = function() {
    simulation = new Simulation(IngameScene.currentLevel);
    simulation.show()
}

IngameScene.nextLevel = function() {
    IngameScene.currentLevel = IngameScene.levels[1]
    IngameScene.restartLevel();
}

IngameScene.hide = function() {

    // do stuff before we draw and update the next scene
};


IngameScene.resize = function() {

    // do stuff when window is resized
};


IngameScene.update = function() {

    // update stuff here

    if(!Game.paused) {
        simulation.update(Timer.delta)

        // update stuff except when paused
    }
};


IngameScene.draw = function() {

    // clear scene
    c.fillStyle = "#005";
    c.fillRect(0, 0, Game.width, Game.height);

    // draw stuff here
    simulation.draw()

    // draw pause screen when paused
    if(Game.paused) {
        c.fillStyle = "rgba(0, 0, 0, 0.8)";
        c.fillRect(0, 0, Game.width, Game.height);
        Text.draw(Game.centerX, 100, 16, "opensans", "center", "#fff", "Paused - Press P to unpause");
    }
};
