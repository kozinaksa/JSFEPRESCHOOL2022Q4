import { getTimeOfDay } from "./greeting";
let max = 20, min = 1, numRand = 1;

function getRandomNum() {
  return numRand = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  const img = new Image();
  numRand < 10 ? numRand = '0' + numRand : numRand;
  img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + getTimeOfDay() + "/" + numRand + ".jpg"
  img.onload = () => {
    document.body.style.backgroundImage = "url('" + img.src + "')";
  };
}

function getSlideNext() {
  return numRand === 20 ? numRand = 1 : numRand = Number(numRand) + 1;
}

function getSlidePrev() {
  return numRand === 1 || numRand === '01' ? numRand = 20 : numRand = Number(numRand) - 1;
}

setBg(getRandomNum());

window.addEventListener('load', function() {
  const btnPrev = document.querySelector('.slider__prev');
  const btnNext = document.querySelector('.slider__next');
  setBg();
  btnPrev.addEventListener('click', function(e) {
    getSlidePrev();
    setBg();
  });
  btnNext.addEventListener('click', function(e) {
    getSlideNext();
    setBg();
  });
});

export { setBg, getRandomNum };