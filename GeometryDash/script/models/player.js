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
        this.jumping = false;
    }

    jump()
    {
        if (!this.jumping)
        {
            this.velocityY = - 10; // Usa la forza del salto per impostare la velocità verticale
            this.jumping = true;
        }
    }

    // canvasHeight: parametro usato per rappresentare l'altezza del canvas
    update(canvasHeight)
    {
        //this.velocityY += this.gravity; // Aggiungo la gravità
        this.y += this.velocityY;
    
        // Controllo: evita che il giocatore scenda sotto il bordo inferiore del canvas
        if (this.y >= canvasHeight - this.height)
        {
            this.y = canvasHeight - this.height;
            this.jumping = false; // Il giocatore smette di saltare quando tocca il bordo inferiore del canvas
            this.velocityY = 0; // velocità verticale = 0, quando il giocatore tocca il bordo inferiore
        }
    }
    
    
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

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Player;