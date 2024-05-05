import Game from "./logic/game.js";

let canvas = document.getElementById('gameCanvas');

let g = new Game(canvas);
g.init();

function runGame()
{
    g.update();
    requestAnimationFrame(runGame);
}

function keyDownHandler(event)
{
    g.keyPressedHandler(event.key.toLowerCase());
}

function keyUpHandler(event)
{
    g.keyReleasedHandler(event.key.toLowerCase());
}

window.onload = runGame;

window.addEventListener("keydown", keyDownHandler);
window.addEventListener("keyup", keyUpHandler);