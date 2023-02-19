import { sourceQuote } from "./_quotes";

const isBtnSettings = document.querySelector('.settings-btn');
const isBtnClose = document.querySelector('.settings_close-bth');
const settingApp = document.querySelector('.settings-container');
const toggleSlider = document.querySelector('.toggle-slider');
const toggleLanguage = document.querySelector('.toggle-language');
const toggleSwitch = document.querySelector('.toggle-switch');
const settingsValues = document.querySelectorAll('.settings-value');
const isLanguageValue = document.querySelectorAll('.value-language');
let showBool = false, activeToggleBool = false;
let language = 'en';

function showSettings() {
  settingApp.classList.add('_show');
  showBool = true;
}

function hideSettings() {
  settingApp.classList.remove('_show');
  showBool = false;
}

function activateToggle() {
  toggleSlider.classList.add('_active');
  toggleSwitch.classList.add('_active');
  activeToggleBool = true;
}

function deactivateToggle() {
  toggleSlider.classList.remove('_active');
  toggleSwitch.classList.remove('_active');
  activeToggleBool = false;
}

function toggleValues(elValue) {
  elValue.forEach(el => {
    !el.classList.contains('_active') ? el.classList.add('_active') : el.classList.remove('_active');
  });
}

function changeLanguage() {
  language === 'en' ? language = 'ru' : language = 'en';
  setLocalStorage();
  getLocalStorage();
  sourceQuote();
}

function setLocalStorage() {
  if (localStorage.getItem('language') === 'undefined') {
    localStorage.clear();
  }
  localStorage.setItem('language', language);
}

function getLocalStorage() {
  if (localStorage.getItem('language') === 'undefined') {
    localStorage.clear();
  }
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
  }
}

function showActualLanguage() {
  isLanguageValue.forEach(el => {
    if (el.textContent === language) {
      el.classList.add('_active');
    }
  });
  if (language === 'ru') {
    activateToggle();
  }
}

getLocalStorage();
window.addEventListener('DOMContentLoaded',setLocalStorage);

let isCityValue = 'Minsk';
window.addEventListener('load', function() {
  getLocalStorage();
  showActualLanguage();

  isBtnSettings.addEventListener('click', (e) => {
    !showBool ? showSettings() : hideSettings();
  });

  isBtnClose.addEventListener('click', hideSettings);

  document.addEventListener('click', (e) => {
    let target = e.target;
    let isSettings = target == settingApp || settingApp.contains(target);
    let isBtn = target == isBtnSettings || isBtnSettings.contains(target);
    if (!isSettings && !isBtn) {
      hideSettings();
    }
  });

  toggleSlider.addEventListener('click', (e) => {
    !activeToggleBool ? activateToggle() : deactivateToggle();
    toggleValues(isLanguageValue);
  });

  toggleLanguage.addEventListener('click', changeLanguage);

});

export { language, isCityValue };