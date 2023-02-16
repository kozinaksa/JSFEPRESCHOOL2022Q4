const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather__error');
const city = document.querySelector('.city');
city.value = 'Minsk';

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c36fdf9b668d78ad77874bc684328a97&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod!="200")
      throw new Error(data.message);
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    wind.textContent = `wind speed: ${data.wind.speed.toFixed(0)}m/s`;
    humidity.textContent = `humidity: ${data.main.humidity.toFixed(0)}%`
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
  // setTimeout(getWeather, 5000);
  if (event.code === 'Enter') {
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
    setLocalStorage();
    getLocalStorage();
    getWeather();
    city.blur();
  }
});

window.addEventListener('beforeunload', setLocalStorage);
document.addEventListener('DOMContentLoaded', getWeather);
window.addEventListener('load', function() {
  getLocalStorage();
  city.addEventListener('keypress', setCity);
});