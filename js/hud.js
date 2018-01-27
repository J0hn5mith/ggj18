function HUD(){};


HUD.prototype.show = function(){
    this.hudText = new Text({
        size : 40,
        font : "komika",
        align : "right",
        color : "#fff",
        borderWidth : 5,
        borderColor : "#000",
        maxWidth : 250,
        lineHeight : 50,
        verticalAlign : "bottom",
        letterSpacing : 3,
        appearCharPerSec : 10
    });
};
HUD._draw_level_info = function(){};
HUD._draw_lives = function(){};
HUD._draw_points = function(){};

HUD.prototype.draw = function(){
    this._draw_level_info();
    this._draw_lives();
    this._draw_points();
};
