function HUD(){};


HUD.prototype.show = function(){
    this.hudText = new Text({
        size : 30,
        font : "opensans",
        align : "right",
        color : "#fff",
    });
};
HUD.prototype._drawLevelInfo = function(){;
    this.hudText.drawPosText(
        simulation.target.pos.x + 55,
        simulation.target.pos.y + simulation.start.r + 45,
        `Level ${gameState.levelCounter+1}`
    );
}
HUD.prototype._draw_lifes = function(){
    this.hudText.drawPosText(
        simulation.start.pos.x + 100,
        simulation.start.pos.y + simulation.start.r + 75,
        `${gameState.lifes} vessels left`
    );
};
HUD._draw_points = function(){};

HUD.prototype.draw = function(){
    c.globalAlpha=0.5;
    this._drawLevelInfo();
    this._draw_lifes();
    //this._draw_points();
    c.globalAlpha=1;
};
