function HUD(){};


HUD.prototype.show = function(){
    this.hudText = new Text({
        size : 40,
        font : "opensans",
        align : "right",
        color : "#fff",
        //borderWidth : 5,
        //borderColor : "#000",
        //maxWidth : 250,
        //lineHeight : 50,
        //verticalAlign : "bottom",
        //letterSpacing : 3,
        //appearCharPerSec : 10
    });
};
HUD._draw_level_info = function(){};
HUD.prototype._draw_lifes = function(){
    this.hudText.drawPosText(simulation.start.pos.x + 100, simulation.start.pos.y + simulation.start.r + 100, `${IngameScene.lifes} vessels left` );
};
HUD._draw_points = function(){};

HUD.prototype.draw = function(){
    //this._draw_level_info();
    this._draw_lifes();
    //this._draw_points();
};
