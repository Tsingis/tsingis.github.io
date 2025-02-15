const fetchAmount = 50
const maxTrivias = fetchAmount * 5
let triviaIndex = 0
let trivias = []
let isLoading = true
let fetchingInProgress = false

const questionElem = document.querySelector(".trivia-question")
const optionsGridElem = document.querySelector(".trivia-options-grid")
const loadingElem = document.querySelector(".trivia-loading")
const triviaPrevButtonElem = document.querySelector(".trivia-prev-button")
const triviaNextButtonElem = document.querySelector(".trivia-next-button")
const showAnswerButtonElem = document.querySelector(".trivia-answer-button")

document.addEventListener("DOMContentLoaded", () => {
  triviaPrevButtonElem.addEventListener("click", prevTrivia)
  triviaNextButtonElem.addEventListener("click", nextTrivia)
  showAnswerButtonElem.addEventListener("click", showAnswer)

  setLoading(true)
  fetchTrivia()
})

async function fetchTrivia() {
  if (fetchingInProgress || trivias.length >= maxTrivias) return
  fetchingInProgress = true

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${fetchAmount}`
    )
    const data = await response.json()

    const newTrivias = data.results.map((result) => ({
      question: result.question,
      type: result.type,
      correct: result.correct_answer,
      options: [...result.incorrect_answers, result.correct_answer],
    }))

    trivias.push(...newTrivias)
    if (isLoading) {
      setLoading(false)
      setTrivia()
    }
  } catch (error) {
    setTimeout(fetchTrivia, 2000)
  } finally {
    fetchingInProgress = false
    updateButtons()
  }
}

function setLoading(loading) {
  isLoading = loading
  loadingElem.style.display = loading ? "block" : "none"
  showAnswerButtonElem.style.display = loading ? "none" : "block"
  updateButtons()
}

function updateButtons() {
  triviaPrevButtonElem.disabled = isLoading || triviaIndex === 0
  triviaNextButtonElem.disabled =
    isLoading || triviaIndex >= Math.min(trivias.length, maxTrivias) - 1
}

function setTrivia() {
  if (isLoading) return

  resetTrivia()
  if (triviaIndex >= trivias.length) {
    setLoading(true)
    fetchTrivia()
    return
  }

  const trivia = trivias[triviaIndex]
  formatOptions(trivia)
  questionElem.innerText = decodeHTML(trivia.question)
  updateButtons()
}

function prevTrivia() {
  if (triviaIndex > 0) {
    triviaIndex--
    setTrivia()
  }
}

function nextTrivia() {
  if (triviaNextButtonElem.disabled) return

  triviaIndex++
  setTrivia()

  if (
    triviaIndex >= Math.floor(trivias.length * 0.8) &&
    trivias.length < maxTrivias
  ) {
    fetchTrivia()
  }
}

function resetTrivia() {
  questionElem.innerText = ""
  optionsGridElem.innerHTML = ""
}

function showAnswer() {
  document.querySelectorAll(".incorrect").forEach((elem) => {
    elem.style.visibility = "hidden"
    setTimeout(() => {
      elem.style.visibility = "visible"
    }, 3000)
  })
}

function formatOptions(trivia) {
  const options =
    trivia.type === "boolean"
      ? [...trivia.options].reverse()
      : [...trivia.options].sort()

  options.forEach((option, i) => {
    const rowElem = document.createElement("div")
    rowElem.classList.add("row")

    const columnElem = document.createElement("div")
    columnElem.classList.add("column")
    columnElem.textContent = `${String.fromCharCode(i + 65)})`

    const optionElem = document.createElement("span")
    optionElem.textContent = decodeHTML(option)

    if (option !== trivia.correct) {
      optionElem.classList.add("incorrect")
    }

    columnElem.appendChild(optionElem)
    rowElem.appendChild(columnElem)
    optionsGridElem.appendChild(rowElem)
  })
}

function decodeHTML(html) {
  const text = document.createElement("textarea")
  text.innerHTML = html
  return text.value
}
