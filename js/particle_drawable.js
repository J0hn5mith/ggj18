function ParticleDrawable() {}


ParticleDrawable.draw = function(particle) {

    // implement particle types here:
    if(particle.type === 1) {
        var opacity = Utils.limit(particle.life / 2.0, 0.0, 1.0);
        c.fillStyle = "rgba(254, 223, 139, " + opacity + ")";
        //c.fillStyle = "#fedf8b";

        c.fillRect(particle.pos.x - 2, particle.pos.y - 2, 4, 4);

    } else if(particle.type === 2) {
        const size = 3;
        var opacity = Utils.limit(particle.life / 0.7, 0.0, 1.0);
        c.fillStyle = "rgba(15, 78, 111, " + opacity + ")";
        c.fillRect(particle.pos.x - size/2, particle.pos.y - size/2, size, size);
    }

};
