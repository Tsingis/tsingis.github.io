const triviasAmount = 50
let isLoading = true
let trivias = []
let triviaIndex = 0

const questionElem = document.querySelector(".trivia-question")
const optionsGridElem = document.querySelector(".trivia-options-grid")
const loadingElem = document.querySelector(".trivia-loading")
const triviaButtonElem = document.querySelector(".trivia-button")
const showAnswerButtonElem = document.querySelector(".trivia-answer-button")

document.addEventListener("DOMContentLoaded", () => {
  triviaButtonElem.addEventListener("click", setTrivia)
  showAnswerButtonElem.addEventListener("click", showAnswer)
  fetchTrivia()
})

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
  isLoading = loading
  loadingElem.style.display = loading ? "block" : "none"
  showAnswerButtonElem.style.display = loading ? "none" : "block"
}

function setTrivia() {
  resetTrivia()
  if (isLoading) {
    return
  }
  if (triviaIndex === triviasAmount) {
    fetchTrivia()
  } else {
    let trivia = trivias[triviaIndex]
    formatOptions(trivia)
    questionElem.innerText = decodeHTML(trivia.question)
    triviaIndex++
  }
}

function resetTrivia() {
  questionElem.innerText = ""
  optionsGridElem.innerHTML = ""
}

function showAnswer() {
  const incorrectOptionsElems = document.querySelectorAll(".incorrect")
  incorrectOptionsElems.forEach((elem) => {
    elem.style.visibility = "hidden"
    setTimeout(() => {
      elem.style.visibility = "visible"
    }, 3000)
  })
}

function formatOptions(trivia) {
  const options = trivia.options
  const type = trivia.type

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
    const optionContent = decodeHTML(options[i])
    option.textContent = optionContent

    if (optionContent !== trivia.correct) {
      option.classList.add("incorrect")
    }

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
