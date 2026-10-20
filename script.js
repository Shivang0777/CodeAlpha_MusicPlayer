const musicContainer = document.querySelector('.music-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('play-icon');
const trackNumber = document.getElementById('track-number');

// Working Free Audio URLs
const songs = [
    {
        name: 'Creative Minds',
        artistName: 'Bensound',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500'
    },
    {
        name: 'Acoustic Breeze',
        artistName: 'Bensound',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500'
    },
    {
        name: 'Sunny',
        artistName: 'Bensound',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500'
    }
];

let songIndex = 0;

// Load song without auto-playing
loadSong(songIndex);

function loadSong(index) {
    songIndex = index;
    title.innerText = songs[index].name;
    artist.innerText = songs[index].artistName;
    audio.src = songs[index].url;
    cover.src = songs[index].img;
    trackNumber.innerText = `Song ${index + 1} of ${songs.length}`;
}

function playSong() {
    musicContainer.classList.add('play');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Playback interrupted or prevented:", error);
        });
    }
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

function togglePlaySong() {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songIndex);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songIndex);
    playSong();
}

// Update progress bar
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (isFinite(duration) && duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    if (isFinite(duration) && duration > 0) {
        audio.currentTime = (clickX / width) * duration;
    }
});

function setVolume(value) {
    audio.volume = value;
}

audio.addEventListener('ended', nextSong);