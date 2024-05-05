// Importa la classe Game dal file "game.js"
import Game from "./logic/game.js";

// Ottiene il riferimento all'elemento canvas dall'HTML
let canvas = document.getElementById('gameCanvas');

// Crea un'istanza della classe Game passando il canvas come parametro
let g = new Game(canvas);

// Inizializza il gioco
g.init();

// Funzione per eseguire il gioco
function runGame()
{
    // Aggiorna lo stato del gioco
    g.update();
    // Richiede l'animazione frame successiva
    requestAnimationFrame(runGame);
}

// Funzione per gestire gli eventi di pressione dei tasti
function keyDownHandler(event)
{
    // Chiama il gestore di pressione dei tasti nella classe Game, convertendo il tasto in lettere minuscole
    g.keyPressedHandler(event.key.toLowerCase());
}

// La funzione runGame viene eseguita quando l'intera finestra HTML è stata caricata
window.onload = runGame;

// Aggiunge un listener per l'evento di pressione dei tasti
window.addEventListener("keydown", keyDownHandler);