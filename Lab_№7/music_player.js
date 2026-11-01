
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

    // Getter текущей композиции
    get currentTrack() 
    {
        return this.tracks[this._currentTrackIndex];
    },

    // Getter громкости
    get volume() 
    {
        return this._volume;
    },

    // Setter громкости
    set volume(value) 
    {
        if (
            Number.isInteger(value) &&
            value >= 0 &&
            value <= 100
        )
            this._volume = value;
        else
            console.log("Ошибка: громкость должна быть целым числом от 0 до 100.");
    },

    // Getter состояния проигрывателя
    get status() 
    {
        const state = this.isPlaying ? "Playing" : "Paused";

        return `${state}
Track: ${this.currentTrack.title}
Artist: ${this.currentTrack.artist}
Volume: ${this.volume}%`;
    },

    // Запуск воспроизведения
    play() 
    {
        this.isPlaying = true;
        console.log(`Playing: ${this.currentTrack.title}`);
    },

    // Приостановка воспроизведения
    pause() 
    {
        this.isPlaying = false;
        console.log("Playback paused.");
    },

    // Следующая композиция
    next() 
    {
        this._currentTrackIndex = (this._currentTrackIndex + 1) % this.tracks.length;
        console.log(`Next track: ${this.currentTrack.title}`);
    },

    // Предыдущая композиция
    previous() 
    {
        this._currentTrackIndex = (this._currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        console.log(`Previous track: ${this.currentTrack.title}`);
    },
};


// Проверка проигрывателя

// Получение текущей композиции
console.log(player.currentTrack);

// Изменение громкости
player.volume = 75;
console.log("Volume:", player.volume);

// Проверка некорректной громкости
player.volume = 150;
player.volume = -10;
player.volume = 50.5;

// Управление воспроизведением
player.play();
console.log(player.status);

player.pause();
console.log(player.status);

// Переключение композиций
player.next();
player.next();
player.next(); // Возврат к первой композиции

player.previous(); // Переход к последней композиции

// Проверка состояния
console.log(player.currentTrack);
console.log(player.status);

// Проверка массива
console.log(player.tracks);