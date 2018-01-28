function LoadingScene() {}


LoadingScene.percentage = 0;


LoadingScene.show = function() {
    PreloadingManager.preload();
};


LoadingScene.hide = function() {
};


LoadingScene.update = function() {
    PreloadingManager.update();
    LoadingScene.percentage = PreloadingManager.getPercentageLoaded();
};


LoadingScene.draw = function() {

    c.fillStyle = "#000";
    c.fillRect(0, 0, Game.width, Game.height);

    c.fillStyle = "#eee";
    c.beginPath();
    c.arc(Game.centerX, Game.centerY, 68, -0.5 * Math.PI, (LoadingScene.percentage * 2 * Math.PI / 100) - (0.5 * Math.PI), false);
    c.arc(Game.centerX, Game.centerY, 60, (LoadingScene.percentage * 2 * Math.PI / 100) - (0.5 * Math.PI), -0.5 * Math.PI, true);
    c.closePath();
    c.fill();

};