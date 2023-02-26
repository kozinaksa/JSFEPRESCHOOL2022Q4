import { getTimeOfDay } from "./_greeting";
import { state } from "./_settings";

const imageTagsContainer = document.querySelector('.container__image-tags');
const tagsContainer = document.querySelector('.tags-container');
const inputTags = document.querySelector('.image-tags-input');
let isTags = document.querySelectorAll('.tag');
let max = 20, min = 1, numRand = 1;
let tagsString = '';
let tagsArray = ['nature', getTimeOfDay()];

function getRandomNum() {
  return numRand = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum();

function normalizeNumber(value) {
  return value.toString().length > 1 ? value : `0${value}`;
}

export function setFon() {
  if (state.imageSource === 'GitHub') {
    if (!imageTagsContainer.classList.contains('_hide')) {
      imageTagsContainer.classList.add('_hide');
    }
    return bgFromGitHub();
  }
  if (state.imageSource === 'Unsplash API') {
    if (imageTagsContainer.classList.contains('_hide')) {
      imageTagsContainer.classList.remove('_hide');
    }
    return bgFromUnsplash();
  }
  if (state.imageSource === 'Flickr API') {
    if (imageTagsContainer.classList.contains('_hide')) {
      imageTagsContainer.classList.remove('_hide');
    }
    bgFromFlickr();
  }
}

function bgFromGitHub() {
  const img = new Image();
  img.src = "https://raw.githubusercontent.com/kozinaksa/image-collection/assets/images/" + getTimeOfDay() + "/" + normalizeNumber(numRand) + ".jpg"
  img.onload = () => {
    document.body.style.backgroundImage = "url('" + img.src + "')";
  };
}

function createCurrentTags() {
  for (let i = 0; i < tagsArray.length; i++) {
    let span = document.createElement('span');
    span.classList.add('tag');
    span.textContent = tagsArray[i];
    tagsContainer.append(span);
  }
}
createCurrentTags();

function tags() {
  if (inputTags.value != '') {
    let span = document.createElement('span');
    span.className = 'tag';
    span.textContent = inputTags.value;
    tagsContainer.append(span);
    inputTags.value = '';
    tagsArray.push(span.textContent);
    setFon();
    span.addEventListener('click', removeTag);
  }
}

function removeTag(e) {
  const tag = e.target;
  for (let i = 0; i < tagsArray.length; i++) {
    if (tag.textContent === tagsArray[i])
      tagsArray.splice(i, 1);
  }
  tagsContainer.removeChild(tag);
  if (tagsArray.length === 0) {
    tagsArray = ['nature', getTimeOfDay()];
    createCurrentTags();
  }
  setFon();
}

function allTags() {
  tagsString = tagsArray.join(',');
  return tagsString.length != 0 ? tagsString : `nature, ${getTimeOfDay()}`
}

async function bgFromUnsplash() {
  // https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17
  try {
    const img = new Image();
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=' + allTags() + '&client_id=1pDt3IBS2Fts6t_-8P6zRqa6wRHa0lfhR5cEt75Rw7g';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      img.src = data.urls.regular;
      img.onload = () => {
        console.log(url);
        document.body.style.backgroundImage = "url('" + img.src + "')";
      }
    });
  }
  catch (err) {
    const img = new Image();
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=' + allTags() + '&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      img.src = data.urls.regular;
      img.onload = () => {
        document.body.style.backgroundImage = "url('" + img.src + "')";
      }
    });
  }
 }

async function bgFromFlickr() {
  // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=784ccd3aa70e35a4120ed45642a0e92b&tags=nature&morning&extras=url_l&format=json&nojsoncallback=1
  const numRandFlickr = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  try {
    const img = new Image();
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=784ccd3aa70e35a4120ed45642a0e92b&tags=' + allTags() + '&extras=url_l&format=json&nojsoncallback=1';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(numRandFlickr, data.photos.photo[numRandFlickr].url_l);
      img.src = data.photos.photo[numRandFlickr].url_l;
      img.onload = () => {
        document.body.style.backgroundImage = "url('" + img.src + "')";
      }
    });
  }
  catch (err) {
    const img = new Image();
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=' + allTags() + '&extras=url_l&format=json&nojsoncallback=1';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      img.src = data.urls.regular;
      img.onload = () => {
        document.body.style.backgroundImage = "url('" + img.src + "')";
      }
    });
  }
 }

function getSlideNext() {
  return numRand === 20 ? numRand = 1 : numRand = numRand + 1;
}

function getSlidePrev() {
  return numRand === 1 ? numRand = 20 : numRand = numRand - 1;
}

document.addEventListener('DOMContentLoaded', function() {
  // getLocalStorage();
  setFon();
});
// window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', function() {
  const btnPrev = document.querySelector('.slider__prev');
  const btnNext = document.querySelector('.slider__next');
  btnPrev.addEventListener('click', function(e) {
    getSlidePrev();
    setFon();
  });
  btnNext.addEventListener('click', function(e) {
    getSlideNext();
    setFon();
  });
  // inputTags.addEventListener('click', tags);

  inputTags.addEventListener('click', (e) => {
    document.addEventListener( 'keyup', (e) => {
      if( e.code === 'Enter') {
        tags();
      }
    });
  });

  let isTags = document.querySelectorAll('.tag');
  isTags.forEach(tag => {
    tag.addEventListener('click', removeTag);
  });
});