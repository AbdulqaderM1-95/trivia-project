import { shuffleArray, ALL_QUESTIONS } from './questions'

const TRIVIA_API = 'https://the-trivia-api.com/v2/questions'

function transform(raw) {
  const opts = shuffleArray([raw.correctAnswer, ...raw.incorrectAnswers])
  return {
    q: raw.question.text,
    options: opts,
    correct: opts.indexOf(raw.correctAnswer),
  }
}

export async function fetchQuestions(difficulty) {
  let apiQuestions = []

  try {
    const url = `${TRIVIA_API}?tags=harry_potter&limit=10&difficulties=${difficulty}`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) apiQuestions = data.map(transform)
    }
  } catch {
    // network unavailable — fall through to local top-up
  }

  // Always guarantee exactly 10 questions by supplementing from the local pool
  if (apiQuestions.length < 10) {
    const local = shuffleArray([...(ALL_QUESTIONS[difficulty] || [])])
    const needed = 10 - apiQuestions.length
    apiQuestions = shuffleArray([...apiQuestions, ...local.slice(0, needed)])
  }

  return apiQuestions.slice(0, 10)
}
