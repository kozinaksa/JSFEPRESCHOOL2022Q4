import { language } from "./_settings";
import { dateTimeTranslation } from "./Languages";

const isTime = document.querySelector('.time');
const isDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const currentDate = date.toLocaleDateString(dateTimeTranslation[language], options);
  isTime.textContent = currentTime;
  isDate.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  setTimeout(showTime, 1000);
}

showTime();