import playList from '../libs/playList.js';
import { state } from './_settings.js';

const playerContainer = document.querySelector('.player');
const isCurrentSong = document.querySelector('.player-current-sound');
const playerTimeline = document.querySelector('.player-timeline-wrapper');
const playerTimelineProgress = document.querySelector('.player-timeline-progress');
const playerTime = document.querySelector('.player-time');
const isCurrentTime = document.querySelector('.player-time__current');
const lengthTime = document.querySelector('.player-time__length');

const playBtn = document.querySelector('.player-controls__play');
const playBtnPrev = document.querySelector('.player-controls__prev');
const playBtnNext = document.querySelector('.player-controls__next');
const volumeBtn = document.querySelector('.player-volume__button');
const volumeSlider = document.querySelector('.player-volume__slider');
const volumeFull = document.querySelector('.player-volume__slider');
const volumePercentage = document.querySelector('.player-volume__slider-percentage');

const playListContainer = document.querySelector('.player-playlist');

const audio = new Audio();
let isPlay = false, playNum = 0;

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('player-playlist__item');
  li.textContent = el.title;
  playListContainer.append(li);
});

const liArray = document.querySelectorAll('.player-playlist__item');

function selectSound(e) {
  const sound = e.target;
  let playBool = true;
  for (let i = 0; i < liArray.length; i++) {
    if (liArray[i] === sound) {
      if (isPlay === false) {
        playBtn.classList.add('pause');
        if (playNum != i) {
          if (liArray[playNum].classList.contains('_active'))
            liArray[playNum].classList.remove('_active');
          if (liArray[playNum].classList.contains('_onPause'))
            liArray[playNum].classList.remove('_onPause');
          audio.currentTime = 0;
          playNum = i;
        }
      }
      if (isPlay) {
        if (playNum != i) {
          audio.pause();
          if (liArray[playNum].classList.contains('_active'))
            liArray[playNum].classList.remove('_active');
          if (liArray[playNum].classList.contains('_onPause'))
            liArray[playNum].classList.remove('_onPause');
          audio.currentTime = 0;
          playNum = i;
        } else {
          playBtn.classList.remove('pause');
          playBool = false;
        }
      }
    }
  }
  playBool === true ? playAudio() : pauseAudio();
}

function playAudio() {
  isPlay = true;
  if (liArray[playNum].classList.contains('_onPause'))
    liArray[playNum].classList.remove('_onPause');
  if (!liArray[playNum].classList.contains('_active'))
    liArray[playNum].classList.add('_active');
  if (audio.currentTime === 0) {
    audio.src = playList[playNum].src;
    audio.title = playList[playNum].title;
    audio.volume = parseInt(window.getComputedStyle(volumePercentage).width) / parseInt(window.getComputedStyle(volumeFull).width);
    audio.onloadedmetadata = () => {
      lengthTime.textContent = getTimeCodeFromNum(audio.duration);
    }
  }
  isCurrentSong.textContent = liArray[playNum].textContent;
  console.log(audio.volume);
  audio.play();
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function pauseAudio() {
  isPlay = false;
  liArray[playNum].classList.add('_onPause');
  audio.pause();
}

function playPrev() {
  liArray[playNum].classList.remove('_onPause');
  liArray[playNum].classList.remove('_active');
  playNum === 0 ? playNum = 3 : playNum = playNum - 1;
  audio.currentTime = 0;
  playAudio();
}

function playNext() {
  liArray[playNum].classList.remove('_onPause');
  liArray[playNum].classList.remove('_active');
  playNum === 3 ? playNum = 0 : playNum = playNum + 1;
  audio.currentTime = 0;
  playAudio();
}

audio.onended = (event) => {
  playNext();
};


setInterval(() => {
  playerTimelineProgress.style.width = audio.currentTime / audio.duration * 100 + "%";
  isCurrentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

export function visiblePlayer() {
  if (state.toggles._audio === 'true' && playerContainer.classList.contains('_hide')) {
    playerContainer.classList.remove('_hide');
  }
  if (state.toggles._audio === 'false' && !playerContainer.classList.contains('_hide')) {
    playerContainer.classList.add('_hide');
  }
}

window.addEventListener('load', function() {
  isCurrentSong.textContent = liArray[playNum].textContent;
  visiblePlayer();

  playBtn.addEventListener('click', function() {
    playBtn.classList.toggle('pause');
    isPlay ? pauseAudio() : playAudio();
  });

  playBtnPrev.addEventListener('click', function() {
    if (!playBtn.classList.contains('pause')) {
      playBtn.classList.add('pause');
    }
    playPrev();
  });

  if (liArray.length > 0) {
    liArray.forEach(sound => {
      sound.addEventListener('click', selectSound);
    });
  }

  playBtnNext.addEventListener('click', function() {
    if (!playBtn.classList.contains('pause')) {
      playBtn.classList.add('pause');
    }
    playNext();
  });

  playerTimeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(playerTimeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  volumeBtn.addEventListener('click', e => {
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeBtn.classList.add('mute');
      volumePercentage.style.opacity = '0';
    } else {
      volumeBtn.classList.remove('mute');
      volumePercentage.style.opacity = '1';
    }
  }, false);

  volumeSlider.addEventListener('click', e => {
    if (!volumeBtn.classList.contains('mute')) {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      volumePercentage.style.width = newVolume * 100 + '%';
      if (newVolume != 0 && volumeBtn.classList.contains('mute')) {
        volumeBtn.classList.remove('mute');
      }
    }
  }, false);
});