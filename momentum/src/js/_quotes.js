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
  const timeInterval = day - hours * 3600 + minutes * 60 + seconds;
  console.log(timeInterval);
  setTimeout(updateQuote, timeInterval);
}

async function getQuotesJson() {
  const quotes = "/kozinaksa-JSFEPRESCHOOL2022Q4/momentum/dist/libs/data.json";
  const res = await fetch(quotes);
  await res.json().then((data) => {
      // console.log(data);
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
      // console.log(data.content.length);
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
});
window.addEventListener('load', function() {
  change.addEventListener('click', (e) => {
    sourceQuote();
    updateQuote();
  });
  source.addEventListener('click', (e) => {
    sourceJson ? sourceJson = false : sourceJson = true;
    // console.log(sourceJson);
  })
});