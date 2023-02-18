const isQuote = document.querySelector('.quote');
const isAuthor = document.querySelector('.author');
const change = document.querySelector('.change-quote');
const source = document.querySelector('.source-quote');
const min = 0, max = 16;
let sourceJson = true;
let author = '', quote = '';

function updateQuote() {
  const day = 86400;
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeInterval = (day - (hours * 3600 + minutes * 60 + seconds)) * 1000;
  console.log(timeInterval);
  setTimeout(sourceQuote, timeInterval);
}

async function getQuotesJson() {
  const quotes = "/kozinaksa-JSFEPRESCHOOL2022Q4/momentum/dist/libs/data.json";
  const res = await fetch(quotes);
  await res.json().then((data) => {
      randomQuote = data[Math.floor(Math.random() * (max - min + 1)) + min];
      quote = randomQuote.text;
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

function sourceQuote() {
  return sourceJson ? getQuotesJson() : getQuotesAPI();
}

getQuotesJson();

document.addEventListener('DOMContentLoaded', function() {
  getQuotesJson();
  getQuotesAPI();
  updateQuote();
});

window.addEventListener('load', function() {
  change.addEventListener('click', (e) => {
    updateQuote();
    sourceQuote();
  });
  source.addEventListener('click', (e) => {
    sourceJson ? sourceJson = false : sourceJson = true;
    updateQuote();
    sourceQuote();
  })
});