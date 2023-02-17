import playList from '../libs/playList.js';

const playBtn = document.querySelector('.player__controls-play');
const playBtnPrev = document.querySelector('.player__controls-prev');
const playBtnNext = document.querySelector('.player__controls-next');
const playListContainer = document.querySelector('.player__playlist');
const audio = new Audio();
let isPlay = false, playNum = 0;

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('player__playlist-item');
  li.textContent = el.title;
  playListContainer.append(li);
});

const liArray = document.querySelectorAll('.player__playlist-item');

function playAudio() {
  isPlay = true;
  liArray[playNum].classList.remove('_onPause');
  if (!liArray[playNum].classList.contains('_active'))
    liArray[playNum].classList.add('_active');
  audio.src = playList[playNum].src;
  audio.title = playList[playNum].title;
  audio.currentTime = 0;
  audio.play();
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
  playAudio();
}

function playNext() {
  liArray[playNum].classList.remove('_onPause');
  liArray[playNum].classList.remove('_active');
  playNum === 3 ? playNum = 0 : playNum = playNum + 1;
  playAudio();
}

window.addEventListener('load', function() {
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

  playBtnNext.addEventListener('click', function() {
    if (!playBtn.classList.contains('pause')) {
      playBtn.classList.add('pause');
    }
    playNext();
  });

  audio.onended = (event) => {
    playNext();
  };
});