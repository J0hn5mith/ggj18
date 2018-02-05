function Levels() {}


Levels.getLevels = function() {

    var destroyShip = function() {
        gameState.shipDestroyed()
    };

    var nextLevel = function() {
        levelManager.nextLevel();
    };

    return [

        // Level 1
        {
            home : new HomePlanet(150, 700, 55),
            celestialObjects : [
                new CelestialObject(960, 400, 45, CO_SUN, [])
            ],
            target : new TargetPlanet(1700, 150, 20, nextLevel)
        },


        // Level 2
        {
            home : new HomePlanet(100, 150, 20),
            celestialObjects : [
                new CelestialObject(1000, 500, 50, CO_SUN, [
                    new OrbitingObject(15, 250, -1.5, 0.5 * Math.PI, 2, destroyShip),
                    new OrbitingObject(20, 150, -3, Math.PI, 3, destroyShip),
                    new OrbitingObject(25, 200, -2, 1.5 * Math.PI, 4, destroyShip),
                    new OrbitingObject(22, 350, -1, 2 * Math.PI, 5, destroyShip)
                ])
            ],
            target : new TargetPlanet(1500, 600, 30, nextLevel)
        },

        // Level 3
        {
            home : new HomePlanet(100, 600, 20),
            celestialObjects : [
                new CelestialObject(1000, 350, 50, CO_SUN, [
                    new OrbitingObject(15, 100, 3, 0.5 * Math.PI, 6, destroyShip),
                    new OrbitingObject(20, 200, -2, Math.PI, 7, destroyShip),
                ]),
                new CelestialObject(1000, 700, 50, CO_SUN, [
                    new OrbitingObject(15, 200, -2, 0.5 * Math.PI, 8, destroyShip),
                    new OrbitingObject(20, 150, -3, Math.PI, 9, destroyShip),
                    new OrbitingObject(25, 250, -1.5, 1.5 * Math.PI, 1, destroyShip),
                    new OrbitingObject(22, 350, -1, 2 * Math.PI, 2, destroyShip)
                ])
            ],
            target : new TargetPlanet(1500, 800, 30, nextLevel)
        }






    ];
};

/*
function Level3() {
    collisionHandler = () => gameState.shipDestroyed();
    const co1 = new CelestialObject(1000, 350, 50, new Vec2(0,0), '#ff1f00');
    const oo1 = new OrbitingObject(co1, 20, 100, 3, '#11ff01', collisionHandler);
    const oo2 = new OrbitingObject(co1, 20, 200, -2, '#11ff01', collisionHandler);

    const co2 = new CelestialObject(1000, 700, 50, new Vec2(0,0), '#ff1f00');
    const oo3 = new OrbitingObject(co2, 20, 200, -3, '#11ff01', collisionHandler, 0.5 * Math.PI);
    const oo4 = new OrbitingObject(co2, 20, 150,-3, '#11ff01', collisionHandler, Math.PI);
    const oo5 = new OrbitingObject(co2, 20, 200, -3, '#11ff01', collisionHandler, 1.5*Math.PI);
    const oo6 = new OrbitingObject(co2, 20, 150, -3, '#11ff01', collisionHandler, 2*Math.PI);
    co1.orbitingObjects = [oo1, oo2];
    co2.orbitingObjects = [oo3, oo4, oo5, oo6] ;
    return new Level(
        new Vec2(100, 500),
        [co1, co2],
        new TargetPlanet(1500, 500, 20, new Vec2(000, 0), (ship) => {
            gameState.nextLevel();
        })
    );
};

function Level4() {
    collisionHandler = () => gameState.shipDestroyed();

    const co1 = new CelestialObject(1400, 200, 50, new Vec2(0,0), '#ff1f00');
    const oo1 = new OrbitingObject(co1, 20, 350, -4, '#11ff01', collisionHandler, 0.5 * Math.PI);
    const oo2 = new OrbitingObject(co1, 20, 450, -4, '#11ff01', collisionHandler, Math.PI);
    const oo3 = new OrbitingObject(co1, 20, 500, -4, '#11ff01', collisionHandler, 1.5*Math.PI);
    const oo4 = new OrbitingObject(co1, 20, 650, -4, '#11ff01', collisionHandler, 2*Math.PI);
    co1.orbitingObjects = [oo1, oo2, oo3, oo4] ;
    return new Level(
        new Vec2(100, 700),
        [co1],
        new TargetPlanet(1200, 400, 20, new Vec2(0, 0), (ship) => {
            gameState.nextLevel();
        })
    );
};

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
    const co4 = new CelestialObject(1000, 900, 50, new Vec2(0,0), Colors.YELLOW_LIGHT, 1);
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
        Level1(),
        Level2(),
        Level4(),
        new Level(new Vec2(100, 500), [co3, co4], target),
        //new Level(new Vec2(100, 500), [co1], target),
        //new Level(new Vec2(200, 100), [co2], target),
        //new Level(new Vec2(100, 500), [co3, co4], target),
    ];
}
*/