import { state } from "./_settings";
import { greetingTranslation, placeholderTranslation } from "./Languages";

const greetingContainer = document.querySelector('.greeting-container');
const name = document.querySelector('.name');
const isUserName = document.querySelector('.username');
const isGreeting = document.querySelector('.greeting');
const greetingEn = ['night', 'morning', 'afternoon', 'evening'];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return greetingEn[Math.floor(hours/6)];
}

function visibleGreeting() {
  if (state.toggles._greeting === 'true' && greetingContainer.classList.contains('_hide')) {
    greetingContainer.classList.remove('_hide');
  }
  if (state.toggles._greeting === 'false' && !greetingContainer.classList.contains('_hide')) {
    greetingContainer.classList.add('_hide');
  }
}

function showGreeting() {
  visibleGreeting();
  // showName();
  const timeIndex = greetingEn.indexOf(getTimeOfDay());
  isGreeting.textContent = greetingTranslation[state.language][timeIndex];
  setTimeout(showGreeting, 1000);
}

export function showName() {
  if (isUserName.textContent.trim() === '') {
    isUserName.textContent = placeholderTranslation[state.language];
    isUserName.classList.add('_none-name');
  }
  if (isUserName.textContent.includes(placeholderTranslation['en'])) {
    isUserName.classList.add('_none-name');
    if (state.language === 'ru')
      isUserName.textContent = placeholderTranslation[state.language];
  }
  if (isUserName.textContent.includes(placeholderTranslation['ru'])) {
    isUserName.classList.add('_none-name');
    if (state.language === 'en')
      isUserName.textContent = placeholderTranslation[state.language];
  }
  else
    isUserName.textContent = name.value;

}

function setLocalStorage() {
  if (localStorage.getItem('name') === 'undefined') {
    localStorage.clear();
  }
  localStorage.setItem('name', name.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name') === 'undefined') {
    localStorage.clear();
  }
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
    isUserName.textContent = name.value;
  }
}

function colorName() {
  if (isUserName.textContent.length === 0) {
    isUserName.textContent = placeholderTranslation[state.language];
    isUserName.classList.add('_none-name');
  }
  if (isUserName.classList.contains('_none-name') && !isUserName.textContent.includes(placeholderTranslation[state.language])) {
    isUserName.classList.remove('_none-name');
  }
}

function sizeGreeting() {
  if (isGreeting.getBoundingClientRect().y === isUserName.getBoundingClientRect().y && isGreeting.offsetWidth + isUserName.offsetWidth < window.innerWidth) {
    isUserName.classList.remove('_inline-block');
  }
  if (isGreeting.offsetWidth + isUserName.offsetWidth > window.innerWidth) {
    isUserName.classList.add('_inline-block');
    isUserName.style.maxWidth = Math.floor(window.innerWidth - window.innerWidth/10)  + 'px';
  }
}

window.addEventListener('DOMContentLoaded', function() {
  getLocalStorage();
  showGreeting();
  showName();
});
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', function() {
isUserName.addEventListener('click', function(e) {
  if (isUserName.textContent.includes(placeholderTranslation[state.language])) {
    isUserName.textContent = '';
  }
  isUserName.classList.remove('_none-name');
  isUserName.contentEditable = 'true';
  isUserName.style.borderBottom = '2px solid coral';
  isUserName.style.paddingBottom = '6px';
  sizeGreeting();
});

isUserName.addEventListener( 'keyup', function(e) {
  if( e.code === 'Enter') {
    isUserName.textContent = isUserName.textContent.replace(/(\r\n|\n|\r)/gm," ");
    e.stopPropagation();
    e.preventDefault();
    isUserName.contentEditable = 'false';
    name.value = isUserName.textContent;
    setLocalStorage();
    isUserName.style.borderBottom = "none";
    colorName();
    isUserName.blur();
  };
  sizeGreeting();
});

document.addEventListener('click', (e) => {
  let target = e.target;
  let nameUser = target == isUserName || isUserName.contains(target);

  if (!nameUser) {
    name.value = isUserName.textContent;
    setLocalStorage();
    isUserName.style.borderBottom = "none";
    colorName();
    sizeGreeting();
  }
});

  showName();
  showGreeting()
  colorName();
  sizeGreeting();
});

export { getTimeOfDay };