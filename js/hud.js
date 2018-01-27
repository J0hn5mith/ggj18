function HUD(){};


HUD._draw_level_info = function(){};
HUD._draw_lives = function(){};
HUD._draw_points = function(){};

HUD.draw = function(){
    this._draw_level_info();
    this._draw_lives();
    this._draw_points();
};
