var canvas;
var c;

var gameState;
var levelManager;
var background;
var space;
var hud;
var intro;
var simulation;


jQuery(document).ready(function() {

    canvas = document.getElementById("game");
    c = canvas.getContext("2d");

    Timer.init();
    PerformanceMonitor.init();

    PageVisibility.init();

    Keyboard.init();
    Mouse.init();

    Game.start();
});
