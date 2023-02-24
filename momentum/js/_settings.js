import { settingsTranslation } from "./Languages";
import { visiblePlayer } from "./_audioPlayer";
import { sourceQuote, visibleQuote } from "./_quotes";
import { showName } from "./_greeting";

const state = {
  language: 'en',
  imageSource: 'GitHub',
  toggles: {
    _time: 'true',
    _date: 'true',
    _greeting: 'true',
    _quote: 'true',
    _weather: 'true',
    _audio: 'true',
    _dop: 'true'
  }
}

const isBtnSettings = document.querySelector('.settings-btn');
const isBtnClose = document.querySelector('.settings_close-bth');
const settingApp = document.querySelector('.settings-container');

const toggleSliders = document.querySelectorAll('.toggle-show');
const toggleSwitches = document.querySelectorAll('.switch-show');
const settingsNames = document.querySelectorAll('.settings-name');

const toggleLanguage = document.querySelector('.toggle-slider', '._language');
const switchLanguage = document.querySelector('.toggle-switch', '._language');
const isLanguageValue = document.querySelectorAll('.value-language');

const isSourceFonValue =document.querySelectorAll('.value-source-image');
const overlay = document.querySelector('.overlay');

let showBool = false, activeToggleBool = false;

function showSettings() {
  // TODO: add change language here and make function updateShowSettings
  updateSettingsNames();
  settingApp.classList.add('_show');
  overlay.classList.add('_active');

  showBool = true;
}

function hideSettings() {
  settingApp.classList.remove('_show');
  overlay.classList.remove('_active');
  showBool = false;
}

function activateToggleLanguage() {
  toggleLanguage.classList.add('_active');
  switchLanguage.classList.add('_active');
  activeToggleBool = true;
}

function deactivateToggleLanguage() {
  toggleLanguage.classList.remove('_active');
  switchLanguage.classList.remove('_active');
  activeToggleBool = false;
}

function toggleValues(elValue) {
  elValue.forEach(el => {
    !el.classList.contains('_active') ? el.classList.add('_active') : el.classList.remove('_active');
  });
}

function changeLanguage() {
  state.language === 'en' ? state.language = 'ru' : state.language = 'en';
  setLocalStorage();
  getLocalStorage();
  sourceQuote();
  updateSettingsNames();
  showName();
}

function updateSettingsNames() {
  for (let i = 0; i < settingsNames.length; i++) {
    settingsNames[i].textContent = settingsTranslation[state.language][i];
  }
}

function setLocalStorage() {
  if (localStorage.getItem('language') === 'undefined') {
    localStorage.clear();
  }
  localStorage.setItem('language', state.language);
  localStorage.setItem('toggle_time', state.toggles._time);
  localStorage.setItem('toggle_date', state.toggles._date);
  localStorage.setItem('toggle_greeting', state.toggles._greeting);
  localStorage.setItem('toggle_quote', state.toggles._quote);
  localStorage.setItem('toggle_weather', state.toggles._weather);
  localStorage.setItem('toggle_audio', state.toggles._audio);
  localStorage.setItem('toggle_dop', state.toggles._dop);
}

function getLocalStorage() {
  if (localStorage.getItem('language') === 'undefined') {
    localStorage.clear();
  }
  if (localStorage.getItem('language')) {
    state.language = localStorage.getItem('language');
    localStorage.getItem('toggle_time') != null ? state.toggles._time = localStorage.getItem('toggle_time') : state.toggles._time = true;
    state.toggles._date = localStorage.getItem('toggle_date');
    state.toggles._greeting = localStorage.getItem('toggle_greeting');
    state.toggles._quote= localStorage.getItem('toggle_quote');
    state.toggles._weather = localStorage.getItem('toggle_weather');
    state.toggles._audio = localStorage.getItem('toggle_audio');
    state.toggles._dop = localStorage.getItem('toggle_dop');
  }
}

function showActualLanguage() {
  isLanguageValue.forEach(el => {
    if (el.textContent === state.language) {
      el.classList.add('_active');
    }
  });
  if (state.language === 'ru') {
    activateToggleLanguage();
  }
}

function showActualImageSource() {
  isSourceFonValue.forEach(el => {
    if (el.textContent === state.imageSource) {
      if (!el.classList.contains('_active'))
        el.classList.add('_active');
      if (el.classList.contains('_hide'))
        el.classList.remove('_hide');
    } else {
      if (el.classList.contains('_active'))
        el.classList.remove('_active');
      if (!el.classList.contains('_hide'))
        el.classList.add('_hide');
    }
  });
}

function showActualToggles() {
  toggleSliders.forEach(toggle => {
    for (let key in state.toggles) {
      if (toggle.classList.contains(key)) {
        if (state.toggles[key] === 'true' && !toggle.classList.contains('_active')) {
          toggle.classList.add('_active');
          for (let isSwitch of toggleSwitches) {
            if (isSwitch.classList.contains(key)) {
              isSwitch.classList.add('_active');
            }
          }
          break
        }
        if (state.toggles[key] === 'false' && toggle.classList.contains('_active')) {
          toggle.classList.remove('_active');
          for (let isSwitch of toggleSwitches) {
            if (isSwitch.classList.contains(key)) {
              isSwitch.classList.remove('_active');
            }
          }
          break
        }
      }
    }
  });
}

import { setFon } from "./_slider";

function changeSourceFon(e) {
  const source = e.target;
  if (!source.classList.contains('_active'))
  source.classList.add('_active');
  if (source.classList.contains('_hide'))
  source.classList.remove('_hide');
  isSourceFonValue.forEach(value => {
    if (value.textContent != source.textContent && value.classList.contains('_active')) {
      value.classList.remove('_active');
      value.classList.add('_hide');
    }
  });
  state.imageSource = source.textContent;
  setLocalStorage();
  getLocalStorage();
  setFon();
}

// getLocalStorage();
window.addEventListener('DOMContentLoaded',getLocalStorage, setFon);
window.addEventListener('beforeunload', setLocalStorage);

let isCityValue = 'Minsk';
window.addEventListener('load', function() {
  getLocalStorage();
  showActualLanguage();
  showActualImageSource();
  showActualToggles();

  isBtnSettings.addEventListener('click', (e) => {
    !showBool ? showSettings() : hideSettings();
  });

  isBtnClose.addEventListener('click', hideSettings);

  // const tag = document.querySelectorAll('.tag');
  // document.addEventListener('click', (e) => {
  //   let target = e.target;
  //   let isSettings = target == settingApp || settingApp.contains(target);
  //   let isBtn = target == isBtnSettings || isBtnSettings.contains(target);
  //   let isTag = target == tag || tag.includes(target);
  //   if (!isSettings && !isBtn && !isTag) {
  //     hideSettings();
  //   }
  // });

  toggleLanguage.addEventListener('click', (e) => {
    !activeToggleBool ? activateToggleLanguage() : deactivateToggleLanguage();
    toggleValues(isLanguageValue);
    changeLanguage();
  });

  isSourceFonValue.forEach(valueFon => {
    valueFon.addEventListener('click', changeSourceFon);
  });

  toggleSliders.forEach(isToggle => {
    isToggle.addEventListener('click', function(e) {
      for (let key in state.toggles) {
        if (isToggle.classList.contains(key)) {
          if (isToggle.classList.contains('_active')) {
            isToggle.classList.remove('_active');
            for (let isSwitch of toggleSwitches) {
              if (isSwitch.classList.contains(key)) {
                isSwitch.classList.remove('_active');
              }
            }
          }  else {
            isToggle.classList.add('_active');
            for (let isSwitch of toggleSwitches) {
              if (isSwitch.classList.contains(key)) {
                isSwitch.classList.add('_active');
              }
            }
          }
          state.toggles[key] === 'true' ? state.toggles[key] = 'false' : state.toggles[key] = 'true';
          setLocalStorage();
          visibleQuote();
          visiblePlayer();
        }
      }
    });
  });

});

export { state, isCityValue };