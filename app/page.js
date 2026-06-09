'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import WelcomeScreen      from '@/components/WelcomeScreen'
import HouseSelect        from '@/components/HouseSelect'
import DifficultySelect   from '@/components/DifficultySelect'
import QuizScreen         from '@/components/QuizScreen'
import ResultsScreen      from '@/components/ResultsScreen'
import LeaderboardScreen  from '@/components/LeaderboardScreen'

import { ALL_QUESTIONS, DIFF_LABELS, shuffleArray } from '@/lib/questions'
import { saveToLeaderboard, getLeaderboard, clearLeaderboard } from '@/lib/leaderboard'

// Particles uses DOM, must be client-only with no SSR
const Particles = dynamic(() => import('@/components/Particles'), { ssr: false })

// Screens
const SCREENS = {
  WELCOME:     'welcome',
  HOUSE:       'house',
  DIFFICULTY:  'difficulty',
  QUIZ:        'quiz',
  RESULTS:     'results',
  LEADERBOARD: 'leaderboard',
}

export default function Home() {
  // ── Theme ────────────────────────────────────────────────
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = (() => {
      try { return localStorage.getItem('tr_theme') || 'dark' } catch { return 'dark' }
    })()
    setTheme(stored)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light')
    try { localStorage.setItem('tr_theme', theme) } catch {}
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  // ── Navigation ───────────────────────────────────────────
  const [screen, setScreen] = useState(SCREENS.WELCOME)

  // ── Game state ───────────────────────────────────────────
  const [house,      setHouse]      = useState(null)  // 'g' | 's' | 'r' | 'h'
  const [houseName,  setHouseName]  = useState('')
  const [difficulty, setDifficulty] = useState(null)  // 'easy' | 'medium' | 'hard'
  const [questions,  setQuestions]  = useState([])
  const [qIndex,     setQIndex]     = useState(0)
  const [score,      setScore]      = useState(0)

  // useRef to avoid stale-closure issue when saving to leaderboard
  const scoreRef = useRef(0)

  // ── Leaderboard ──────────────────────────────────────────
  const [entries, setEntries] = useState([])

  function refreshLeaderboard() {
    setEntries(getLeaderboard())
  }

  // ── Flow handlers ────────────────────────────────────────
  function handleBegin() {
    setScreen(SCREENS.HOUSE)
  }

  function handleHouseSelect(key, name) {
    setHouse(key)
    setHouseName(name)
    setScreen(SCREENS.DIFFICULTY)
  }

  function handleDifficultySelect(diff) {
    const qs = shuffleArray([...(ALL_QUESTIONS[diff] || [])])
    setDifficulty(diff)
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    scoreRef.current = 0
    setScreen(SCREENS.QUIZ)
  }

  function handleAnswer(isCorrect) {
    let newScore = scoreRef.current
    if (isCorrect) {
      newScore += 1
      scoreRef.current = newScore
      setScore(newScore)
    }

    const next = qIndex + 1
    if (next < questions.length) {
      setQIndex(next)
    } else {
      // Game over — go to results
      setScreen(SCREENS.RESULTS)
    }
  }

  function handleSaveScore(entry) {
    saveToLeaderboard(entry)
    refreshLeaderboard()
  }

  function handlePlayAgain() {
    // Keep house and difficulty, re-shuffle questions
    const qs = shuffleArray([...(ALL_QUESTIONS[difficulty] || [])])
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    scoreRef.current = 0
    setScreen(SCREENS.QUIZ)
  }

  function handleShowLeaderboard() {
    refreshLeaderboard()
    setScreen(SCREENS.LEADERBOARD)
  }

  function handleClearLeaderboard() {
    clearLeaderboard()
    setEntries([])
  }

  function handleBackFromLeaderboard() {
    // Return to results if we came from there (score > 0), else welcome
    if (screen === SCREENS.LEADERBOARD && questions.length > 0 && qIndex === questions.length - 1) {
      setScreen(SCREENS.RESULTS)
    } else {
      setScreen(SCREENS.WELCOME)
    }
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <>
      <Particles />

      {screen === SCREENS.WELCOME && (
        <WelcomeScreen
          theme={theme}
          onToggleTheme={toggleTheme}
          onBegin={handleBegin}
          onLeaderboard={handleShowLeaderboard}
        />
      )}

      {screen === SCREENS.HOUSE && (
        <HouseSelect
          onSelect={handleHouseSelect}
          onBack={() => setScreen(SCREENS.WELCOME)}
        />
      )}

      {screen === SCREENS.DIFFICULTY && (
        <DifficultySelect
          house={house}
          houseName={houseName}
          onSelect={handleDifficultySelect}
          onBack={() => setScreen(SCREENS.HOUSE)}
        />
      )}

      {screen === SCREENS.QUIZ && questions.length > 0 && (
        <QuizScreen
          key={qIndex}           /* remount per question to reset timer */
          questions={questions}
          questionIndex={qIndex}
          score={score}
          onAnswer={handleAnswer}
        />
      )}

      {screen === SCREENS.RESULTS && (
        <ResultsScreen
          score={scoreRef.current}
          total={questions.length}
          difficulty={difficulty}
          house={house}
          houseName={houseName}
          onSave={handleSaveScore}
          onPlayAgain={handlePlayAgain}
          onLeaderboard={handleShowLeaderboard}
        />
      )}

      {screen === SCREENS.LEADERBOARD && (
        <LeaderboardScreen
          entries={entries}
          onBack={handleBackFromLeaderboard}
          onClear={handleClearLeaderboard}
        />
      )}
    </>
  )
}
