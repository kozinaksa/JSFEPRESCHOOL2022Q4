import { state } from "./_settings";

const isQuote = document.querySelector('.quote');
const isAuthor = document.querySelector('.author');
const change = document.querySelector('.change-quote');
const quoteContainer = document.querySelector('.quote-container');
const min = 0, max = 54;
let sourceJson = true;
let randomQuote = {};
let author = '', quote = '';

function updateQuote() {
  const day = 86400;
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeInterval = (day - (hours * 3600 + minutes * 60 + seconds)) * 1000;
  setTimeout(sourceQuote, timeInterval);
}

async function getQuotesJson() {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const quotes = "./js/data.json";
  const res = await fetch(quotes);
  await res.json().then((data) => {
    randomQuote = data[state.language][randomNum];
    quote = randomQuote.text;
    // if (quote.length >= 130) {
    //   getQuotesJson();
    // }
    author = randomQuote.author;
    showQuote();
  });
}

async function getQuotesAPI() {
  const quotes = 'https://api.quotable.io/random';
  const res = await fetch(quotes);
  await res.json().then((data) => {
      if (data.content.length >= 130) {
        getQuotesAPI();
      }
      else {
        quote = data.content;
        author = data.author
        showQuote();
      }
  });
}

export function visibleQuote() {
  if (state.toggles._quote === 'true' && change.classList.contains('_hide')) {
    change.classList.remove('_hide');
    quoteContainer.classList.remove('_hide');
  }
  if (state.toggles._quote === 'false' && !change.classList.contains('_hide')) {
    change.classList.add('_hide');
    quoteContainer.classList.add('_hide');
  }
}

function showQuote() {
  isQuote.textContent = quote;
  isAuthor.textContent = author;
}

export function sourceQuote() {
  return getQuotesJson();
  // return sourceJson ? getQuotesJson() : getQuotesAPI();
}


document.addEventListener('DOMContentLoaded', sourceQuote, updateQuote);
window.addEventListener('load', function() {
  visibleQuote();
  change.addEventListener('click', (e) => {
    updateQuote();
    sourceQuote();
  });
  // source.addEventListener('click', (e) => {
  //   sourceJson ? sourceJson = false : sourceJson = true;
  //   updateQuote();
  //   sourceQuote();
  // })
});