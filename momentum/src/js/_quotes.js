import { state } from "./_settings";

const isQuote = document.querySelector('.quote');
const isAuthor = document.querySelector('.author');
const change = document.querySelector('.change-quote');
// const source = document.querySelector('.source-quote');
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
  const quotes = "/kozinaksa-JSFEPRESCHOOL2022Q4/momentum/dist/libs/data.json";
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