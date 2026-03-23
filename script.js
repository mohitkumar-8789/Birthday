const tracks = [
  {
    title: "Golden Hour",
    src: "assets/songs/song1.mp3",
  },
  {
    title: "Dreamy Celebration",
    src: "assets/songs/song2.mp3",
  },
  {
    title: "Birthday Lights",
    src: "assets/songs/song3.mp3",
  },
  {
    title: "Forever Friends",
    src: "assets/songs/song4.mp3",
  },
];

const fallbackTracks = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
];

const audio = document.getElementById("audio-player");
const trackTitle = document.getElementById("track-title");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playlistEl = document.getElementById("playlist");

let currentTrack = 0;
let isPlaying = false;

function setTrack(index) {
  currentTrack = (index + tracks.length) % tracks.length;
  const selected = tracks[currentTrack];

  trackTitle.textContent = selected.title;
  audio.src = selected.src;

  // If local file is missing, switch to a reliable sample URL.
  audio.onerror = () => {
    audio.src = fallbackTracks[currentTrack];
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  };

  updatePlaylistUI();
}

function renderPlaylist() {
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `${index + 1}. ${track.title}`;
    btn.addEventListener("click", () => {
      setTrack(index);
      playAudio();
    });
    li.appendChild(btn);
    playlistEl.appendChild(li);
  });
}

function updatePlaylistUI() {
  const buttons = playlistEl.querySelectorAll("button");
  buttons.forEach((button, index) => {
    button.classList.toggle("active", index === currentTrack);
  });
}

function playAudio() {
  audio.play().then(() => {
    isPlaying = true;
    playBtn.textContent = "⏸";
  }).catch(() => {
    isPlaying = false;
    playBtn.textContent = "▶";
  });
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

prevBtn.addEventListener("click", () => {
  setTrack(currentTrack - 1);
  if (isPlaying) {
    playAudio();
  }
});

nextBtn.addEventListener("click", () => {
  setTrack(currentTrack + 1);
  if (isPlaying) {
    playAudio();
  }
});

audio.addEventListener("ended", () => {
  setTrack(currentTrack + 1);
  playAudio();
});

renderPlaylist();
setTrack(0);
