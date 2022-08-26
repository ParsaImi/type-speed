const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const records = document.querySelector(".records");

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");
  let correct = true;
  arrayQuote.forEach((charSpan, index) => {
    const charinInput = arrayValue[index];
    if (charinInput == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      correct = false;
    } else if (charinInput === charSpan.innerText) {
      quoteInput.setAttribute("maxlength", "1000");
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
      charSpan.style.backgroundColor = null;
    } else {
      if (charSpan.innerText === " ") {
        charSpan.style.backgroundColor = "red";
      }
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      correct = false;
      quoteInput.setAttribute("maxlength", "1");
    }
  });
  if (correct) {
    renderQuotes();
  }
});

function saveTime(time) {
  const newSpan = document.createElement("span");
  if (time == 0) {
    newSpan.innerText = null;
  } else {
    newSpan.innerText = time;
    records.appendChild(newSpan);
  }
}

let startTime;
function startTimer() {
  saveTime(timerElement.innerText);
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTime();
  }, 1000);
}

function getTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderQuotes() {
  const quote = await getRandomQuote();
  quoteDisplay.innerText = "";
  quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteDisplay.appendChild(charSpan);
  });
  quoteInput.value = null;
  startTimer();
}

renderQuotes();
