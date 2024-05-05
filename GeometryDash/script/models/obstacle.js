class Obstacle
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'red';
    }

    update(speed)
    {
        this.x -= speed;
    }

    checkCollision(object)
    {
        if(this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y)
            {
                return true; // Collisione rilevata
        }
        return false; // Nessuna collisione
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Obstacle;
