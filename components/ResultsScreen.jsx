'use client'
import { useState } from 'react'
import { HOUSE_ICONS, DIFF_LABELS } from '@/lib/questions'

export default function ResultsScreen({
  score, total, difficulty, house, houseName,
  onSave, onPlayAgain, onLeaderboard,
}) {
  const [name, setName]       = useState('')
  const [saved, setSaved]     = useState(false)
  const [shareState, setShare] = useState('idle') // idle | copied | failed

  const pct       = Math.round((score / total) * 100)
  const diffLabel = DIFF_LABELS[difficulty] || difficulty
  const houseIcon = HOUSE_ICONS[house] || '☠'

  function getVerdict() {
    if (pct === 100) return '☠ Perfect. The Dark Lord is most pleased.'
    if (pct >= 80)  return '🐍 You have proven your devotion.'
    if (pct >= 60)  return '💀 Acceptable… for now.'
    if (pct >= 40)  return '😬 The Dark Lord is… disappointed.'
    return '💀 You have failed the Dark Lord. Nagini is hungry.'
  }

  function handleSave() {
    if (!name.trim()) return
    onSave({
      name: name.trim(),
      score, total, difficulty, diffLabel,
      house, houseName,
      pct,
      date: new Date().toLocaleDateString(),
    })
    setSaved(true)
  }

  function handleShare() {
    const lines = [
      '☠ Tom Riddle\'s Test ☠', '',
      `${name.trim() || 'Anonymous'} scored ${score}/${total} (${pct}%) — ${diffLabel}`,
      `${houseIcon} ${houseName}`, '',
      'Can you prove yourself worthy of the Dark Lord? 🐍',
    ]
    const text = lines.join('\n')

    function onCopied() {
      setShare('copied')
      setTimeout(() => setShare('idle'), 2200)
    }
    function onFail() {
      setShare('failed')
      setTimeout(() => setShare('idle'), 2000)
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(onCopied).catch(() => fbCopy(text, onCopied, onFail))
    } else {
      fbCopy(text, onCopied, onFail)
    }
  }

  function fbCopy(text, onSuccess, onFail) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); onSuccess() }
    catch { onFail() }
    document.body.removeChild(ta)
  }

  const shareLabel =
    shareState === 'copied' ? '✓ Copied!' :
    shareState === 'failed' ? '✗ Failed'  : '📋 Share'

  return (
    <div className="screen active">
      <div className="card">
        <div className="results-house-badge">{houseIcon}</div>
        <h1 className="score-big">{score}<span style={{ fontSize: '0.5em', color: 'var(--text-dim)' }}>/{total}</span></h1>
        <p className="score-label">{pct}% — {diffLabel}</p>
        <p className="subtitle">{getVerdict()}</p>

        <div className="score-breakdown">
          <div className="score-stat">
            <div className="stat-val">{score}</div>
            <div className="stat-key">Correct</div>
          </div>
          <div className="score-stat">
            <div className="stat-val">{total - score}</div>
            <div className="stat-key">Wrong</div>
          </div>
          <div className="score-stat">
            <div className="stat-val">{pct}%</div>
            <div className="stat-key">Accuracy</div>
          </div>
        </div>

        {/* Save to leaderboard */}
        {!saved ? (
          <div className="name-form">
            <input
              className="name-input"
              type="text"
              maxLength={24}
              placeholder="Enter your name to save score…"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
            <button className="btn" onClick={handleSave} disabled={!name.trim()}>
              💾 Save to Leaderboard
            </button>
          </div>
        ) : (
          <p className="subtitle" style={{ marginTop: '0.8rem' }}>
            ✓ Score saved, {name.trim()}!
          </p>
        )}

        <div className="btn-row">
          <button
            className={`btn${shareState === 'copied' ? ' share-copied' : ''}`}
            onClick={handleShare}
          >
            {shareLabel}
          </button>
          <button className="btn" onClick={onLeaderboard}>🏆 Leaderboard</button>
          <button className="btn" onClick={onPlayAgain}>🔄 Play Again</button>
        </div>
      </div>
    </div>
  )
}
