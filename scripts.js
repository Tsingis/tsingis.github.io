const triviasAmount = 10
const showText = "Show answer"

let answer = ""
let isTouchingAnswer = false
let trivias = []
let triviaIndex = 0

const questionElem = document.querySelector(".trivia-question")
const optionsGridElem = document.querySelector(".trivia-options-grid")
const answerElem = document.querySelector(".trivia-answer")
const loadingElem = document.querySelector(".trivia-loading")

document.addEventListener("DOMContentLoaded", () => {
  answerElem.addEventListener("click", toggleAnswer)
  answerElem.addEventListener("mouseover", showAnswer)
  answerElem.addEventListener("mouseleave", resetAnswer)
  answerElem.addEventListener("touchstart", handleAnswerTouchStart, {
    passive: true,
  })
  answerElem.addEventListener("touchend", handleAnswerTouchEnd)
  document.addEventListener("touchmove", handleTouchMove)
  fetchTrivia()
})

function handleAnswerTouchStart(event) {
  event.stopPropagation()
  isTouchingAnswer = true
  document.body.style.overflow = "hidden"
}

function handleAnswerTouchEnd(event) {
  event.stopPropagation()
  isTouchingAnswer = false
  document.body.style.overflow = "auto"
}

function handleTouchMove(event) {
  if (!isTouchingAnswer) {
    document.body.style.overflow = "auto"
  } else {
    document.body.style.overflow = "hidden"
  }
}

function fetchTrivia() {
  setLoading(true)
  fetch(`https://opentdb.com/api.php?amount=${triviasAmount}`)
    .then((response) => response.json())
    .then((data) => {
      trivias = []
      triviaIndex = 0
      data.results.forEach((result) => {
        let options = result.incorrect_answers
        options.push(result.correct_answer)
        let trivia = {
          question: result.question,
          type: result.type,
          correct: result.correct_answer,
          options: options,
        }
        trivias.push(trivia)
      })
      setLoading(false)
      setTrivia()
    })
    .catch((error) => {
      setLoading(true)
      setTimeout(fetchTrivia, 2000)
    })
}

function setLoading(loading) {
  loadingElem.style.display = loading ? "block" : "none"
}

function isLoading() {
  return loadingElem.style.display === "block"
}

function setTrivia() {
  resetTrivia()
  if (isLoading()) {
    return
  }
  if (triviaIndex === triviasAmount) {
    fetchTrivia()
  } else {
    let trivia = trivias[triviaIndex]
    answer = trivia.correct
    formatOptions(trivia.options, trivia.type)
    questionElem.innerText = decodeHTML(trivia.question)
    answerElem.innerText = showText
    triviaIndex++
  }
}

function resetTrivia() {
  questionElem.innerText = ""
  answerElem.innerText = ""
  optionsGridElem.innerHTML = ""
}

function formatOptions(options, type) {
  options.sort()
  if (type === "boolean") {
    options.reverse()
  }

  let counter = 0
  for (let i = 0; i < options.length; i++) {
    const row = document.createElement("div")
    if (counter % 2 === 0) {
      row.classList.add("row")
      optionsGridElem.appendChild(row)
    }

    const column = document.createElement("div")
    column.classList.add("column")
    column.textContent = `${String.fromCharCode(i + 65)})`

    const option = document.createElement("span")
    option.textContent = decodeHTML(options[i])

    column.appendChild(option)
    row.appendChild(column)
    counter++

    optionsGridElem.appendChild(row)
  }
}

function decodeHTML(html) {
  const text = document.createElement("textarea")
  text.innerHTML = html
  return text.value
}

function showAnswer() {
  if (!isLoading()) {
    answerElem.innerText = decodeHTML(answer)
  }
}

function resetAnswer() {
  if (!isLoading()) {
    answerElem.innerText = showText
  }
}

function toggleAnswer() {
  if (!isLoading()) {
    if (answerElem.classList.contains("active")) {
      answerElem.classList.remove("active")
      answerElem.innerText = showText
    } else {
      answerElem.classList.add("active")
      answerElem.innerText = decodeHTML(answer)
    }
  }
}
