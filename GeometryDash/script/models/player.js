class Player
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.color = 'yellow';
        this.xbase = x;
        this.salto = 10;
        this.jumpHeight = 100;
        this.jumpDuration = 500;
    }

    jump()
    {
        if(!this.jumping)
        {
            this.jumping = true;
            const startTime = performance.now();
            const startHeight = this.y;

            const animateJump = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / this.jumpDuration, 1);
                this.y = startHeight - this.jumpHeight * Math.sin(progress * Math.PI);
                if(progress < 1)
                {
                    requestAnimationFrame(animateJump);
                } else {
                    this.jumping = false;
                    this.y = startHeight;
                }
            };
            requestAnimationFrame(animateJump);
        }
    }

    update()
    {
        
    }
    
    /*
    // Controllo della collisione con un oggetto rettangolare
    checkCollision(obstacle)
    {
        return(
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        );
    }
    */

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Player;