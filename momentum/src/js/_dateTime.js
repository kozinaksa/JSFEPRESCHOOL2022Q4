const isTime = document.querySelector('.time');
const isDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const currentDate = date.toLocaleDateString('en-US', options);
  isTime.textContent = currentTime;
  isDate.textContent = currentDate;
  setTimeout(showTime, 1000);
}

showTime();