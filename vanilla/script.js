// custom script
const createFaq = function (data) {
  const item = document.createElement('div')
  const question = document.createElement('div')
  const answer = document.createElement('div')
  // add classes and data
  item.setAttribute('class', 'faqs__item')
  item.setAttribute('data-number', data.id)
  question.setAttribute('class', 'faqs__item__question')
  question.textContent = 'Q: ' +data.question
  answer.setAttribute('class', 'faqs__item__answer')
  answer.textContent = data.answer
  // append to container
  item.appendChild(question)
  item.appendChild(answer)
  return item

}

const toggleAnswer = function (e) {
  let el = e.target
  if (!el.classList.contains('faqs__item__question')) {
    return
  }
  let hParent = el.closest('.faqs__item')
  el.classList.toggle('faqs__item__question--selected')
  hParent.querySelector('.faqs__item__answer').classList.toggle('faqs__item__answer--selected')
}

async function main () {
  const response = await fetch('faqs.json')
  const data = await response.json()
  const container = document.getElementById('app')
  // add clickevent listener
  container.addEventListener('click', toggleAnswer)
  data.faqs.forEach((item) => {
    container.appendChild(createFaq(item))
  })
}
document.addEventListener('DOMContentLoaded', main)
