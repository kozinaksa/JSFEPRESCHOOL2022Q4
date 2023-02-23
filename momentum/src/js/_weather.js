import { state } from "./_settings";
import { weatherTranslation } from "./Languages";

const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather__error');
const city = document.querySelector('.city');
city.value = weatherTranslation[state.language][2];

export async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=c36fdf9b668d78ad77874bc684328a97&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod!="200")
      throw new Error(data.message);
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent = `${weatherTranslation[state.language][0]} ${data.wind.speed.toFixed(0)}m/s`;
    humidity.textContent = `${weatherTranslation[state.language][1]} ${data.main.humidity.toFixed(0)}%`
    weatherDescription.textContent = data.weather[0].description;
    // setTimeout(getWeather, 10000);
  } catch (err) {
    weatherHide();
  }
}

function weatherHide() {
  weatherIcon.className = '';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
  city.value === '' ? weatherError.textContent = 'Please, enter city' : weatherError.textContent = `Error. City '${city.value}' not found`;
}

function setLocalStorage() {
  if (localStorage.getItem('city') === 'undefined') {
    localStorage.clear();
  }
  localStorage.setItem('city', city.value);
}

function getLocalStorage() {
  if (localStorage.getItem('city') === 'undefined') {
    localStorage.clear();
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    city.style.borderBottom = '2px solid #fff';
    setLocalStorage();
    getLocalStorage();
    getWeather();
    city.blur();
  }
}

document.addEventListener('click', (e) => {
  let target = e.target;
  let isCity = target == city || city.contains(target);
  if (!isCity) {
    city.style.borderBottom = '2px solid #fff';
    setLocalStorage();
    getLocalStorage();
    getWeather();
    city.blur();
  }
  if (isCity) {
    city.style.borderBottom = '2px solid coral';
  }
});

// getLocalStorage();
window.addEventListener('DOMContentLoaded', getLocalStorage, getWeather);
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', function() {
  getWeather();
  city.addEventListener('keypress', setCity);
});