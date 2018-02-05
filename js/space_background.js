function SpaceBackground() {


    this.canvas = Utils.createCanvas(3840, 1080);
    this.context = Utils.getContext(this.canvas);
    Img.drawIn(this.context, "background", 0, 0);
    this.data = this.context.getImageData(0, 0, 3840, 1080).data;

    this.offsetX = 1920;
    this.targetPos = 1;
    this.currentPos = 1;
    this.dir = 1;

    this.transAni = 0.0;

    this.stars = [];

    for(var i = 0; i < 2400; i++) {
        this.stars.push({
            pos : new Vec2(Utils.randFloat(0, 3840), Utils.randFloat(0, 1080)),
            a : Utils.randFloat(0, HALF_PI),
            s : Utils.randFloat(0.25, 1.0)
        });
    }

}


SpaceBackground.prototype.switchSide = function() {
    if(this.dir === 1) {
        this.dir = -1;
        this.targetPos = 0;
    } else {
        this.dir = 1;
        this.targetPos = 1;
    }
};


SpaceBackground.prototype.update = function() {
    if(this.currentPos !== this.targetPos) {
        this.currentPos += this.dir * Timer.delta * (intro.playing ? (1 / 10) : 0.2);
        this.currentPos = Utils.limit(this.currentPos, 0, 1);
        this.offsetX = Interpolate.cube(this.currentPos) * 1920;
        this.transAni = Interpolate.cube(this.dir === 1 ? this.currentPos : (1 - this.currentPos));
    }
};


SpaceBackground.prototype.draw = function() {
    if(intro.starsVisibility < 1.0) {
        c.globalAlpha = intro.starsVisibility;
    }
    Img.drawCustom("background", this.offsetX, 0, 1920, 1080, 0, 0, 1920, 1080);
    if(intro.starsVisibility < 1.0) {
        c.globalAlpha = 0.0;
    }
};


SpaceBackground.prototype.drawStars = function() {
    var star;
    var pos;
    var j;
    c.fillStyle = "#fff";

    if(intro.starsVisibility < 1.0) {
        c.globalAlpha = intro.starsVisibility;
    }

    c.save();
    c.translate(-this.offsetX, 0);
    for(var i = 0; i < this.stars.length; i++) {
        star = this.stars[i];
        if(star.pos.x >= this.offsetX && star.pos.x <= this.offsetX + 1920) {
            pos = star.pos;
            for(j = 0; j < space.blackHoles.length; j++) {
                if(space.blackHoles[j].isStarAffected(pos)) {
                    pos = space.blackHoles[j].affectStar(pos);
                }
            }

            c.save();
            c.translate(pos.x, pos.y);
            c.rotate(star.a);
            c.scale(star.s, star.s);
            c.fillRect(-1, -1, 2, 2);
            c.restore();
        }
    }

    c.restore();

    if(intro.starsVisibility < 1.0) {
        c.globalAlpha = 1.0;
    }
};