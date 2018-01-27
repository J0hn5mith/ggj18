function Level(startPosition, celestialObjects, target){
    this.startPosition = startPosition;
    this.celestialObjects = celestialObjects;
    this.target = target;
}

function Levels() {
    collisionHandler = () => gameState.shipDestroyed();
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
        gameState.nextLevel();
    });

    return [
        new Level(new Vec2(100, 500), [co1], target),
        new Level(new Vec2(200, 100), [co2], target),
        new Level(new Vec2(100, 500), [co3, co4], target),
    ];
}
