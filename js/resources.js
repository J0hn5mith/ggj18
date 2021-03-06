function Resources() {}


Resources.images = {
    background : "img/background.png",
    planets : "img/planets.png",
    alienBody : "img/alien_body.png",
    alienLeftArm : "img/alien_left_arm.png",
    alienRightArm : "img/alien_right_arm.png"
};


Resources.webFonts = [
    "opensans",
    "geometria"
];


Resources.pixelFonts = {
};


Resources.sounds = {
    ingame_fun : {
        source : ["audio/ingame_fun.ogg", "audio/ingame_fun.mp3"],
        instances : 1
    },
    ingame_serious : {
        source : ["audio/ingame_serious.ogg", "audio/ingame_serious.mp3"],
        instances : 1
    },
    intro : { source : ["audio/intro.mp3", "audio/intro.ogg"], instances : 1 },
    boom : { source : ["audio/boom.mp3", "audio/boom.ogg"], instances : 2 }
};
