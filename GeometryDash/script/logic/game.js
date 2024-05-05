import Player from "../models/player.js";
import Obstacle from "../models/obstacle.js";

class Game {
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = new Player(50, (canvas.height / 2) + 195, 30, 30);
        this.obstacles = [];
        this.score = 0;
        this.gameSpeed = 0.04;
        this.isGameOver = false;
        this.obstacleSpawnInterval = 2000; // Intervallo di tempo in millisecondi per lo spawn degli ostacoli (ad esempio, ogni 2 secondi)
        this.lastObstacleSpawnTime = 0; // Memorizza il tempo dell'ultimo spawn di ostacoli
    }

    init()
    {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.startObstacleSpawn();
        this.update();
    }

    startObstacleSpawn()
    {
        setInterval(() => {
            this.spawnObstacle(); // Ogni intervallo di tempo, spawn un nuovo ostacolo
        }, this.obstacleSpawnInterval);
    }

    spawnObstacle()
    {
        const obstacle = new Obstacle(this.canvas.width, this.canvas.height - 20, 20, 20);
        this.obstacles.push(obstacle);
    }

    jump()
    {
        this.player.jump();
    }

    update()
    {
        if (this.isGameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.update();
        this.player.draw(this.ctx);

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.update(this.gameSpeed);
            obstacle.draw(this.ctx);
        }

        if (this.checkCollision()) {
            this.gameOver();
            return;
        }

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        requestAnimationFrame(() => this.update());
    }


    keyPressedHandler(key)
    {
        if(key == 'Space')
        {
            this.player.jump();
        }
    }

    keyReleasedHandler(key)
    {
        if(key == 'Space')
        {
            this.player.y = 0;
        }
    }

    checkCollision()
    {
        for (let i = 0; i < this.obstacles.length; i++)
        {
            const obstacle = this.obstacles[i];
            if (
                this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y
            )
            {
                if (this.player.y < obstacle.y)
                {
                    // Il player è sopra l'ostacolo
                    return false; // Non c'è collisione
                } else
                {
                    // Il player ha colpito l'ostacolo
                    return true; // C'è collisione
                }
            }
        }
        return false;
    }
    

    gameOver()
    {
        this.isGameOver = true;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '40px Arial';
        this.ctx.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2);
    }
}

export default Game;
