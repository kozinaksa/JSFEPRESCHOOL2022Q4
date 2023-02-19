import { getTimeOfDay } from "./_greeting";
let max = 20, min = 1, numRand = 1;

function getRandomNum() {
  return numRand = Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizeNumber(value) {
  return value.toString().length > 1 ? value : `0${value}`;
}

function setBg() {
  const img = new Image();
  img.src = "https://raw.githubusercontent.com/kozinaksa/image-collection/assets/images/" + getTimeOfDay() + "/" + normalizeNumber(numRand) + ".jpg"
  img.onload = () => {
    document.body.style.backgroundImage = "url('" + img.src + "')";
  };
}

function getSlideNext() {
  return numRand === 20 ? numRand = 1 : numRand = numRand + 1;
}

function getSlidePrev() {
  return numRand === 1 ? numRand = 20 : numRand = numRand - 1;
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