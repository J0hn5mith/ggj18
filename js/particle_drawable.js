function ParticleDrawable() {}


ParticleDrawable.draw = function(particle) {

    // implement particle types here:
    if(particle.type === 1) {
        var opacity = Utils.limit(particle.life / 2.0, 0.0, 1.0);
        //c.fillStyle = "rgba(0, 0, 255, " + opacity + ")";
        c.fillStyle = "#fedf8b";

        c.fillRect(particle.pos.x - 2, particle.pos.y - 2, 4, 4);

    } else if(particle.type === 2) {
        var opacity = Utils.limit(particle.life / 0.7, 0.0, 1.0);
        c.fillStyle = "#0f4e6f";
        c.fillRect(particle.pos.x - 1, particle.pos.y - 1, 2, 2);
    }

};
