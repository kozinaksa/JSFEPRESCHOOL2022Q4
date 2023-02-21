import { language } from "./_settings";
import { greetingTranslation } from "./Languages";

const name = document.querySelector('.name');
const isUserName = document.querySelector('.username');
const isGreeting = document.querySelector('.greeting');
const greetingEn = ['night', 'morning', 'afternoon', 'evening'];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return greetingEn[Math.floor(hours/6)];
}

function showGreeting() {
  const timeIndex = greetingEn.indexOf(getTimeOfDay());
  isGreeting.textContent = greetingTranslation[language][timeIndex];
  setTimeout(showGreeting, 1000);
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
    isUserName.textContent = '[Enter name]';
    isUserName.classList.add('_none-name');
  }
  if (isUserName.classList.contains('_none-name') && !isUserName.textContent.includes('[Enter name]')) {
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

getLocalStorage();
showGreeting();

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', function() {
isUserName.addEventListener('click', function(e) {
  if (isUserName.textContent.includes('[Enter name]')) {
    isUserName.textContent = '';
  }
  isUserName.classList.remove('_none-name');
  isUserName.contentEditable = 'true';
  isUserName.style.borderBottom = '2px solid coral';
  isUserName.style.paddingBottom = '6px';
  sizeGreeting();
});

document.addEventListener( 'keyup', function(e) {
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

  showGreeting()
  sizeGreeting();
  getLocalStorage();
  colorName();
  sizeGreeting();
});

showGreeting();
export { getTimeOfDay };