class Obstacle
{
    // Inizializza le proprietà dell'ostacolo
    constructor(x, y, width, height)
    {
        // Posizione orizzontale dell'ostacolo
        this.x = x;
        // Posizione verticale dell'ostacolo
        this.y = y;
        // Larghezza dell'ostacolo
        this.width = width;
        // Altezza dell'ostacolo
        this.height = height;
        // Colore dell'ostacolo
        this.color = 'red';
    }

    // Aggiorna la posizione dell'ostacolo in base alla velocità del gioco
    update(speed)
    {
        // Sposta l'ostacolo verso sinistra con una velocità pari a 'speed'
        this.x -= speed;
    }

    // Controlla se c'è una collisione tra l'ostacolo e un oggetto
    checkCollision(object)
    {
        // Verifica se ci sono collisioni tra i rettangoli dell'ostacolo e dell'oggetto
        if(this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y)
            {
                return true; // Collisione rilevata
        }
        return false; // Nessuna collisione
    }

    // Disegna l'ostacolo sul canvas
    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Obstacle;
