let answer = "";
let isTouchingAnswer = false;
const showText = "Show answer";

const questionElem = document.querySelector(".output-question");
const optionsElem = document.querySelector(".output-options");
const answerElem = document.querySelector(".output-answer");
const loadingElem = document.querySelector(".output-loading");


document.addEventListener("DOMContentLoaded", () => {
  answerElem.addEventListener("click", toggleAnswer);
  answerElem.addEventListener("mouseover", showAnswer);
  answerElem.addEventListener("mouseleave", resetAnswer);
  answerElem.addEventListener("touchstart", handleAnswerTouchStart, { passive: true });
  answerElem.addEventListener("touchend", handleAnswerTouchEnd);

  document.addEventListener("touchmove", handleTouchMove);

  setTrivia();
});

function handleAnswerTouchStart(event) {
  event.stopPropagation();
  isTouchingAnswer = true;
  document.body.style.overflow = "hidden";
}

function handleAnswerTouchEnd(event) {
  event.stopPropagation();
  isTouchingAnswer = false;
  document.body.style.overflow = "auto";
}

function handleTouchMove(event) {
  if (!isTouchingAnswer) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }
}

function setTrivia() {
  fetch("https://opentdb.com/api.php?amount=1")
    .then((response) => response.json())
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
    })
    .catch((error) => {
      loadingElem.style.display = "block";
      setTimeout(setTrivia, 2000);
    });
}

function formatOptions(options, type) {
  options.sort();
  if (type === "boolean") {
    options.reverse();
  }
  const joined = options.slice(0, -1).join(", ");
  return joined + " or " + options.slice(-1);
}

function decodeHTML(html) {
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}

function showAnswer() {
  answerElem.innerText = decodeHTML(answer);
}

function resetAnswer() {
  answerElem.innerText = showText;
}

function toggleAnswer() {
  if (answerElem.classList.contains("active")) {
    answerElem.classList.remove("active");
    answerElem.innerText = showText;
  } else {
    answerElem.classList.add("active");
    answerElem.innerText = decodeHTML(answer);
  }
}
