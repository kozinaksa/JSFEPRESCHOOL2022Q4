import { state } from "./_settings";
import { dateTimeTranslation } from "./Languages";

const isTime = document.querySelector('.time');
const isDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function visibleDateTime() {
  if (state.toggles._time === 'true' && isTime.classList.contains('_hide')) {
    isTime.classList.remove('_hide');
  }
  if (state.toggles._time === 'false' && !isTime.classList.contains('_hide')) {
    isTime.classList.add('_hide');
  }
  if (state.toggles._date === 'true' && isDate.classList.contains('_hide')) {
    isDate.classList.remove('_hide');
  }
  if (state.toggles._date === 'false' && !isDate.classList.contains('_hide')) {
    isDate.classList.add('_hide');
  }
}

function showTime() {
  visibleDateTime();
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const currentDate = date.toLocaleDateString(dateTimeTranslation[state.language], options);
  isTime.textContent = currentTime;
  isDate.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  setTimeout(showTime, 1000);
}

window.addEventListener('DOMContentLoaded', showTime);