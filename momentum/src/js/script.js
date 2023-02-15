import '../index.html';
import '../libs/normalize.css';
import '../style/scss/fonts.scss';
import '../style/scss/style.scss';


import { showTime } from './dateTime';
import { showGreeting, setLocalStorage, getLocalStorage, colorName, sizeGreeting } from './greeting';

showTime();
showGreeting();
window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', sizeGreeting);
// window.addEventListener('load', getLocalStorage);
// window.addEventListener('load', colorName);
window.addEventListener('load', function() {
  sizeGreeting();
  getLocalStorage();
  colorName();
  sizeGreeting();
});