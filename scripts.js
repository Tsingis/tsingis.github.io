let answer = "";
const showText = "Show answer";

const questionElem = document.querySelector(".output-question");
const optionsElem = document.querySelector(".output-options");
const answerElem = document.querySelector(".output-answer");
const loadingElem = document.querySelector(".output-loading")

document.addEventListener("DOMContentLoaded", fetchTrivia);

function fetchTrivia() {
  fetch("https://opentdb.com/api.php?amount=1")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    loadingElem.style.display = "none";
    let results = data.results[0];
    let correct = results.correct_answer;
    let options = results.incorrect_answers;
    options.push(correct);
    answer = correct;
    optionsElem.innerText = decodeHTML(formatOptions(options, results.type));
    questionElem.innerText = decodeHTML(results.question);
    answerElem.innerText = showText;
    loadingElem.style.display = "none";
  })
  .catch((error) => {
    loadingElem.style.display = "block";
    setTimeout(fetchTrivia, 2000);
  });
}

function formatOptions(options, type) {
  options = options.sort();
  if (type === "boolean") {
    options.reversed();
  }
  const joined = options.slice(0, -1).join(", ");
  return joined + " or " + options.slice(-1);
}

function decodeHTML(html) {
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}

function changeContent(element) {
  element.innerText = decodeHTML(answer);
}

function resetContent(element) {
  element.innerText = showText;
}

function toggleContent(element) {
  if (element.classList.contains("active")) {
    element.classList.remove("active");
    element.innerText = showText;
  } else {
    element.classList.add("active");
    element.innerText = decodeHTML(answer);
  }
}