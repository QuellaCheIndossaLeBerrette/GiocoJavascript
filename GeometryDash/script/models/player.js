class Player
{
    // Inizializza le proprietà del giocatore
    constructor(x, y, width, height)
    {
        // Posizione orizzontale del giocatore
        this.x = x;
        // Posizione verticale del giocatore
        this.y = y;
        // Larghezza del giocatore
        this.width = width;
        // Altezza del giocatore
        this.height = height;
        // Colore del giocatore
        this.color = 'yellow';
        // Posizione orizzontale di base del giocatore (usata per il salto)
        this.xbase = x;
        // Altezza del salto del giocatore
        this.jumpHeight = 100;
        // Durata del salto del giocatore (in millisecondi)
        this.jumpDuration = 500;
    }

    // Gestisce l'evento di salto del giocatore
    jump()
    {
        // Verifica se il giocatore è già in fase di saltos
        if(!this.jumping)
        {
            // Imposta il flag jumping a true per indicare che il giocatore è in fase di salto
            this.jumping = true;
            // Memorizza il tempo di inizio del salto
            const startTime = performance.now();
            // Memorizza l'altezza iniziale del salto
            const startHeight = this.y;

            // Funzione per animare il salto
            const animateJump = (currentTime) => {
                // Calcola il tempo trascorso dall'inizio del salto
                const elapsedTime = currentTime - startTime;

                // Calcola il progresso del salto in base al tempo trascorso
                const progress = Math.min(elapsedTime / this.jumpDuration, 1);

                // Calcola la nuova altezza del giocatore utilizzando una funzione sinusoidale
                this.y = startHeight - this.jumpHeight * Math.sin(progress * Math.PI);

                // Se il salto non è completato (progress < 1), continua l'animazione richiedendo il frame successivo
                if(progress < 1)
                {
                    requestAnimationFrame(animateJump);
                } else{
                    // Se il salto è completato, imposta il flag jumping a false e ripristina l'altezza del giocatore
                    this.jumping = false;
                    this.y = startHeight;
                }
            };
            // Avvia l'animazione del salto richiedendo il primo frame
            requestAnimationFrame(animateJump);
        }
    }

    // Aggiorna lo stato del giocatore
    update()
    {
        // al momento è vuoto poiché il movimento del giocatore è gestito principalmente dall'evento di salto.
    }

    // Disegna il giocatore sul canvas
    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Player;