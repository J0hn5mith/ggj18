function IngameScene() {}


IngameScene.lifes = 3;
IngameScene.levelCounter = 0;
IngameScene.levelCounter = 0;

IngameScene.show = function() {

    space = new Space();

    // do stuff before we update and draw this scene for the first time
    IngameScene._loadLevels();
    IngameScene.hud = new HUD();
    IngameScene.hud.show();

    IngameScene.restartLevel()
};

IngameScene._loadLevels = function() {

    collisionHandler = () => IngameScene.restartLevel();
    const co1 = new CelestialObject(1000, 500, 50, new Vec2(0,0), '#ff1f00');
    oo1 = new OrbitingObject(co1, 20, 100, 3, '#11ff01', collisionHandler);
    oo2 = new OrbitingObject(co1, 20, 200, -2, '#11ff01', collisionHandler);
    co1.orbitingObjects.push(oo1);
    co1.orbitingObjects.push(oo2);

    const co2 = new CelestialObject(1000, 900, 50, new Vec2(0,0), Colors.YELLOW_DARK);
    oo1 = new OrbitingObject(co2, 20, 100, 3, '#11ff01', collisionHandler);
    oo2 = new OrbitingObject(co2, 20, 200, -2, '#11ff01', collisionHandler);
    oo3 = new OrbitingObject(co2, 20, 300, 2, '#11ff01', collisionHandler);
    co2.orbitingObjects.push(oo1);
    co2.orbitingObjects.push(oo2);
    co2.orbitingObjects.push(oo3);

    const co3 = new CelestialObject(800, 400, 50, new Vec2(0,0), Colors.YELLOW_LIGHT);
    const co4 = new CelestialObject(1000, 900, 50, new Vec2(0,0), Colors.YELLOW_LIGHT);
    oo1 = new OrbitingObject(co3, 20, 100, 3, Colors.YELLOW_DARK, collisionHandler);
    oo2 = new OrbitingObject(co3, 20, 200, -2, Colors.YELLOW_DARK, collisionHandler);
    oo3 = new OrbitingObject(co4, 20, 300, 2, Colors.YELLOW_DARK, collisionHandler);
    co3.orbitingObjects.push(oo1);
    co3.orbitingObjects.push(oo2);
    co4.orbitingObjects.push(oo3);

    const target = new TargetPlanet(1500, 500, 20, new Vec2(000, 0), (ship) => {
        IngameScene.nextLevel();
    });

    IngameScene.levels = [
        new Level(new Vec2(100, 500), [co1], target),
        new Level(new Vec2(200, 100), [co2], target),
        new Level(new Vec2(100, 500), [co3, co4], target),
    ];
};

IngameScene.restartLevel = function() {
    IngameScene.currentLevel = IngameScene.levels[IngameScene.levelCounter]
    simulation = new Simulation(IngameScene.currentLevel);
    simulation.show()
};

IngameScene.nextLevel = function() {
    IngameScene.levelCounter++;
    IngameScene.restartLevel();
};

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
    c.fillStyle = "#000";
    c.fillRect(0, 0, Game.width, Game.height);

    // draw stuff here
    space.draw();
    simulation.draw()
    IngameScene.hud.draw();

    // draw pause screen when paused
    if(Game.paused) {
        c.fillStyle = "rgba(0, 0, 0, 0.8)";
        c.fillRect(0, 0, Game.width, Game.height);
        Text.draw(Game.centerX, 100, 16, "opensans", "center", "#fff", "Paused - Press P to unpause");
    }
};
