'use client'
import { useEffect, useRef, useState } from 'react'
import { NAGINI_CORRECT, NAGINI_WRONG } from '@/lib/questions'

const LETTERS = ['I', 'II', 'III', 'IV']
const TIME_LIMIT = 15

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function QuizScreen({ questions, questionIndex, score, onAnswer }) {
  const q = questions[questionIndex]
  const total = questions.length

  const [timeLeft, setTimeLeft]     = useState(TIME_LIMIT)
  const [chosen, setChosen]         = useState(null)   // index chosen, or -1 for timeout
  const [naginiMsg, setNaginiMsg]   = useState('')
  const [locked, setLocked]         = useState(false)

  const timerRef = useRef(null)

  // Reset state when question changes
  useEffect(() => {
    setTimeLeft(TIME_LIMIT)
    setChosen(null)
    setNaginiMsg('')
    setLocked(false)
  }, [questionIndex])

  // Countdown timer
  useEffect(() => {
    if (locked) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, locked])

  function handleTimeout() {
    if (locked) return
    setLocked(true)
    setChosen(-1)
    setNaginiMsg(rand(NAGINI_WRONG))
    setTimeout(() => onAnswer(false), 1400)
  }

  function handleSelect(idx) {
    if (locked) return
    clearInterval(timerRef.current)
    setLocked(true)
    setChosen(idx)
    const isCorrect = idx === q.correct
    setNaginiMsg(isCorrect ? rand(NAGINI_CORRECT) : rand(NAGINI_WRONG))
    setTimeout(() => onAnswer(isCorrect), 1400)
  }

  // Timer ring math
  const circumference = 2 * Math.PI * 22
  const dashOffset = circumference * (1 - timeLeft / TIME_LIMIT)
  const danger = timeLeft <= 5

  return (
    <div className="screen active">
      <div className="card">
        {/* Top bar */}
        <div className="quiz-top">
          <span className="quiz-progress-text">
            Question {questionIndex + 1} / {total}
          </span>

          {/* Timer */}
          <div className="timer-wrap">
            <svg className="timer-svg" viewBox="0 0 52 52" width="52" height="52">
              <circle className="timer-bg"   cx="26" cy="26" r="22" />
              <circle
                className={`timer-ring${danger ? ' danger' : ''}`}
                cx="26" cy="26" r="22"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className={`timer-inner${danger ? ' danger' : ''}`}>{timeLeft}</div>
          </div>

          <span className="quiz-score-text">Score: {score}</span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${((questionIndex + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question */}
        <p className="question-text">{q.q}</p>

        {/* Answers */}
        <ul className="answers-list">
          {q.options.map((opt, i) => {
            let cls = 'answer-btn'
            if (locked) {
              if (i === q.correct) cls += ' correct'
              else if (i === chosen) cls += ' wrong'
            }
            return (
              <li key={i}>
                <button
                  className={cls}
                  disabled={locked}
                  onClick={() => handleSelect(i)}
                >
                  <div className="answer-inner">
                    <div className="answer-letter">{LETTERS[i]}</div>
                    <div className="answer-text">{opt}</div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Nagini feedback */}
        {naginiMsg && (
          <div className="nagini-wrap">
            <span style={{ fontSize: '2rem', flexShrink: 0 }}>🐍</span>
            <span className="nagini-speech">{naginiMsg}</span>
          </div>
        )}
      </div>
    </div>
  )
}
