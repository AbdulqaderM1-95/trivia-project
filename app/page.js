'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import WelcomeScreen      from '@/components/WelcomeScreen'
import NameEntry          from '@/components/NameEntry'
import HouseSelect        from '@/components/HouseSelect'
import DifficultySelect   from '@/components/DifficultySelect'
import QuizScreen         from '@/components/QuizScreen'
import ResultsScreen      from '@/components/ResultsScreen'
import LeaderboardScreen  from '@/components/LeaderboardScreen'

import { ALL_QUESTIONS, shuffleArray } from '@/lib/questions'
import { fetchQuestions }              from '@/lib/fetchQuestions'
import { saveToLeaderboard, getLeaderboard, clearLeaderboard } from '@/lib/leaderboard'

const Particles = dynamic(() => import('@/components/Particles'), { ssr: false })

const SCREENS = {
  WELCOME:     'welcome',
  NAME:        'name',
  HOUSE:       'house',
  DIFFICULTY:  'difficulty',
  LOADING:     'loading',
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
  const [playerName, setPlayerName] = useState('')
  const [house,      setHouse]      = useState(null)
  const [houseName,  setHouseName]  = useState('')
  const [difficulty, setDifficulty] = useState(null)
  const [questions,  setQuestions]  = useState([])
  const [qIndex,     setQIndex]     = useState(0)
  const [score,      setScore]      = useState(0)
  const scoreRef = useRef(0)

  // ── Leaderboard ──────────────────────────────────────────
  const [entries, setEntries] = useState([])

  function refreshLeaderboard() { setEntries(getLeaderboard()) }

  // ── Shared question loader (fetch → fallback) ─────────────
  async function loadQuestions(diff) {
    setScreen(SCREENS.LOADING)
    let qs
    try {
      qs = await fetchQuestions(diff)
    } catch {
      qs = shuffleArray([...(ALL_QUESTIONS[diff] || [])])
    }
    setQuestions(qs)
    setQIndex(0)
    setScore(0)
    scoreRef.current = 0
    setScreen(SCREENS.QUIZ)
  }

  // ── Flow handlers ────────────────────────────────────────
  function handleBegin() { setScreen(SCREENS.NAME) }

  function handleNameConfirm(name) {
    setPlayerName(name)
    setScreen(SCREENS.HOUSE)
  }

  function handleHouseSelect(key, name) {
    setHouse(key)
    setHouseName(name)
    setScreen(SCREENS.DIFFICULTY)
  }

  function handleDifficultySelect(diff) {
    setDifficulty(diff)
    loadQuestions(diff)
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
      setScreen(SCREENS.RESULTS)
    }
  }

  function handleSaveScore(entry) {
    saveToLeaderboard(entry)
    refreshLeaderboard()
  }

  function handlePlayAgain() { loadQuestions(difficulty) }

  function handleNewGame() {
    setPlayerName('')
    setHouse(null)
    setHouseName('')
    setDifficulty(null)
    setQuestions([])
    setQIndex(0)
    setScore(0)
    scoreRef.current = 0
    setScreen(SCREENS.WELCOME)
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
    if (questions.length > 0 && screen === SCREENS.LEADERBOARD) {
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

      {screen === SCREENS.NAME && (
        <NameEntry
          onConfirm={handleNameConfirm}
          onBack={() => setScreen(SCREENS.WELCOME)}
        />
      )}

      {screen === SCREENS.HOUSE && (
        <HouseSelect
          onSelect={handleHouseSelect}
          onBack={() => setScreen(SCREENS.NAME)}
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

      {screen === SCREENS.LOADING && (
        <div className="screen active">
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🐍</p>
            <h2>Summoning Questions…</h2>
            <p className="subtitle">The Dark Lord is preparing your trial.</p>
          </div>
        </div>
      )}

      {screen === SCREENS.QUIZ && questions.length > 0 && (
        <QuizScreen
          key={qIndex}
          questions={questions}
          questionIndex={qIndex}
          score={score}
          onAnswer={handleAnswer}
        />
      )}

      {screen === SCREENS.RESULTS && (
        <ResultsScreen
          playerName={playerName}
          score={scoreRef.current}
          total={questions.length}
          difficulty={difficulty}
          house={house}
          houseName={houseName}
          onSave={handleSaveScore}
          onPlayAgain={handlePlayAgain}
          onLeaderboard={handleShowLeaderboard}
          onNewGame={handleNewGame}
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
