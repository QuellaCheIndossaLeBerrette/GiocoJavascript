// Importa la classe Player dal file "player.js"
import Player from "../models/player.js";
// Importa la classe Obstacle dal file "obstacle.js"
import Obstacle from "../models/obstacle.js";

class Game {
    // Costruttore della classe Game
    constructor(canvas)
    {
        // Canvas su cui viene disegnato il gioco
        this.canvas = canvas;
        // Contesto 2D del canvas
        this.ctx = canvas.getContext('2d');
        // Giocatore
        this.player = new Player(50, (canvas.height / 2) + 195, 30, 30);
        // Lista degli ostacoli presenti nel gioco
        this.obstacles = [];
        // Punteggio ottenuto dal giocatore
        this.score = 0;
        // Velocità del gioco
        this.gameSpeed = 0.04;
        // Flag che indica se il gioco è finito
        this.isGameOver = false;
        // Intervallo di tempo in millisecondi per lo spawn degli ostacoli
        this.obstacleSpawnInterval = 2000;
        // Memorizza il tempo dell'ultimo spawn di ostacoli
        this.lastObstacleSpawnTime = 0;
    }

    // Inizializza il gioco
    init()
    {
        // Imposta le dimensioni del canvas
        this.canvas.width = 1000;
        this.canvas.height = 600;
        // Avvia il processo di spawn degli ostacoli
        this.startObstacleSpawn();
        // Aggiorna lo stato del gioco
        this.update();
    }

    // Disegna gli elementi del gioco sul canvas
    draw()
    {
        // Disegna il giocatore
        this.player.draw(this.ctx);
        for(let i = 0; i < this.obstacles.length; i++)
        {
            // Disegna gli ostacoli presenti nella lista
            this.obstacles[i].draw(this.ctx);
        }
    }

    // Avvia il processo di spawn degli ostacoli ad intervalli regolari
    startObstacleSpawn()
    {
        setInterval(() => {
            this.spawnObstacle(); // Ogni intervallo di tempo, spawn un nuovo ostacolo
        }, this.obstacleSpawnInterval);
    }

    // Crea e aggiunge un nuovo ostacolo alla lista degli ostacoli
    spawnObstacle()
    {
        const obstacle = new Obstacle(this.canvas.width, this.canvas.height - 20, 20, 20);
        this.obstacles.push(obstacle);
    }

    // Gestisce l'evento di salto del giocatore
    jump()
    {
        this.player.jump();
    }

    // Aggiorna lo stato del gioco
    update()
    {
        // Se il gioco è finito, interrompe l'aggiornamento
        if (this.isGameOver) return;

        // Pulisce il canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Aggiorna e disegna il giocatore
        this.player.update();
        this.player.draw(this.ctx);

        // Itera sugli ostacoli
        for (let i = 0; i < this.obstacles.length; i++)
        {
            const obstacle = this.obstacles[i];
            // Aggiorna la posizione dell'ostacolo in base alla velocità del gioco
            obstacle.update(this.gameSpeed);
            // Disegna l'ostacolo
            obstacle.draw(this.ctx);

            // Controllo se l'ostacolo è stato superato con successo
            if (!obstacle.passed && obstacle.x + obstacle.width < this.player.x)
            {
                // Segna l'ostacolo come superato
                obstacle.passed = true;
                // Incrementa lo score
                this.score++;
            }
        }

        // Controlla se c'è una collisione tra il giocatore e gli ostacoli
        if (this.checkCollision())
        {
            // Se c'è una collisione, termina il gioco
            this.gameOver();
            return;
        }

        // Disegna lo score
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        // Richiede l'animazione frame successiva
        requestAnimationFrame(() => this.update());
    }

    // Gestisce l'evento di pressione dei tasti
    keyPressedHandler(key)
    {
        if(key == ' ')
        {
            this.player.jump();
        }
    }

    // Controlla se c'è una collisione tra il giocatore e gli ostacoli
    checkCollision()
    {
        // Itera sugli ostacoli
        for (let i = 0; i < this.obstacles.length; i++)
        {
            const obstacle = this.obstacles[i];
            // Controlla se c'è una collisione tra il giocatore e l'ostacolo corrente
            let collision = obstacle.checkCollision(this.player);
            // Se c'è una collisione, restituisce true
            if(collision)
            {
                return true;
            }
        }
        // Se non ci sono collisioni, restituisce false
        return false;
    }
    
    // Gestisce la fine del gioco
    gameOver()
    {
        this.isGameOver = true;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '40px Arial';
        this.ctx.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2);
        this.ctx.fillText('Score: ' + this.score, this.canvas.width / 2 - 80, this.canvas.height / 2 + 60);
    }
}

export default Game;
