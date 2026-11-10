const player = {
    tracks: [
        {
            id: 1,
            title: "Midnight City",
            artist: "M83",
        },
        {
            id: 2,
            title: "Instant Crush",
            artist: "Daft Punk",
        },
        {
            id: 3,
            title: "Intro",
            artist: "The xx",
        },
    ],

    _currentTrackIndex: 0,
    _volume: 50,
    isPlaying: false,

    get currentTrack() 
    {
        return this.tracks[this._currentTrackIndex];
    },

    get volume() 
    {
        return this._volume;
    },

    set volume(value) 
    {
        if (Number.isInteger(value) && value >= 0 && value <= 100)
            this._volume = value;
        else
            console.log("Ошибка: громкость должна быть целым числом от 0 до 100.");
    },

    get status() 
    {
        const state = this.isPlaying ? "Playing" : "Paused";

        return `${state}
Track: ${this.currentTrack.title}
Artist: ${this.currentTrack.artist}
Volume: ${this.volume}%`;
    },

    play() 
    {
        this.isPlaying = true;
        console.log(`Playing: ${this.currentTrack.title}`);
    },

    pause() 
    {
        this.isPlaying = false;
        console.log("Playback paused.");
    },

    next() 
    {
        this._currentTrackIndex = (this._currentTrackIndex + 1) % this.tracks.length;
        console.log(`Next track: ${this.currentTrack.title}`);
    },

    previous() 
    {
        this._currentTrackIndex = (this._currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        console.log(`Previous track: ${this.currentTrack.title}`);
    },
};


console.log(player.currentTrack);

player.volume = 75;
console.log("Volume:", player.volume);

player.volume = 150;
player.volume = -10;
player.volume = 50.5;

player.play();
console.log(player.status);

player.pause();
console.log(player.status);

player.next();
player.next();
player.next();

player.previous();

console.log(player.currentTrack);
console.log(player.status);
console.log(player.tracks);