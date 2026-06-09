'use client'

const HOUSES = [
  { key: 'g', emoji: '🦁', name: 'Gryffindor', desc: 'Bravery & nerve' },
  { key: 's', emoji: '🐍', name: 'Slytherin',  desc: 'Ambition & cunning' },
  { key: 'r', emoji: '🦅', name: 'Ravenclaw',  desc: 'Wit & wisdom' },
  { key: 'h', emoji: '🦡', name: 'Hufflepuff', desc: 'Loyalty & patience' },
]

export default function HouseSelect({ onSelect, onBack }) {
  return (
    <div className="screen active">
      <div className="card">
        <h2>Choose Your House</h2>
        <p className="subtitle">Your loyalty defines you.</p>

        <div className="house-grid">
          {HOUSES.map(h => (
            <button key={h.key} className="house-btn" onClick={() => onSelect(h.key, h.name)}>
              <span className="house-emoji">{h.emoji}</span>
              <span className="house-name">{h.name}</span>
              <span className="house-desc">{h.desc}</span>
            </button>
          ))}
        </div>

        <div className="btn-row">
          <button className="btn" onClick={onBack}>← Back</button>
        </div>
      </div>
    </div>
  )
}
