'use client'
import { useState } from 'react'

export default function NameEntry({ onConfirm, onBack }) {
  const [name, setName] = useState('')

  function handleConfirm() {
    const trimmed = name.trim()
    if (!trimmed) return
    onConfirm(trimmed)
  }

  return (
    <div className="screen active">
      <div className="card">
        <h2>Who Seeks Entry?</h2>
        <p className="subtitle">
          State your name before the Dark Lord grants you an audience.
        </p>

        <div className="name-form">
          <input
            className="name-input"
            type="text"
            maxLength={24}
            placeholder="Enter your name…"
            value={name}
            autoFocus
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleConfirm()}
          />
        </div>

        <div className="btn-row">
          <button className="btn" onClick={onBack}>← Back</button>
          <button className="btn" onClick={handleConfirm} disabled={!name.trim()}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}
