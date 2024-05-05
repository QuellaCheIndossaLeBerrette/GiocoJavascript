class Sound
{
    // Costruttore per creare un nuovo oggetto Sound con la sorgente audio specificata (src)
    constructor(src)
    {
        // Crea un nuovo elemento HTML Audio con la sorgente specificata
        this.sound = new Audio(src);
    }

    // Metodo per riprodurre il suono
    play()
    {
        // Reimposta l'audio all'inizio
        this.sound.currentTime = 0;
        // Riproduce l'audio
        this.sound.play();
    }
}

export default Sound;