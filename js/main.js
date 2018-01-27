var canvas;
var c;

var gameState;
var simulation;
var space;

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
