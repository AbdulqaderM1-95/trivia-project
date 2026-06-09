'use client'

const DIFFICULTIES = [
  {
    key: 'easy',
    icon: '🌱',
    name: 'Initiate',
    desc: 'Basic knowledge — begin your journey into the Dark Arts',
  },
  {
    key: 'medium',
    icon: '💀',
    name: 'Death Eater',
    desc: 'Intermediate — prove you\'ve mastered the Dark Arts',
  },
  {
    key: 'hard',
    icon: '🐍',
    name: 'Dark Lord',
    desc: 'Expert — only the most devoted servants dare this path',
  },
]

export default function DifficultySelect({ house, houseName, onSelect, onBack }) {
  return (
    <div className="screen active">
      <div className="card">
        <h2>Choose Your Trial</h2>
        <p className="subtitle">
          {houseName} — choose how deeply you serve the Dark Lord.
        </p>

        <div className="diff-grid">
          {DIFFICULTIES.map(d => (
            <button key={d.key} className="diff-btn" onClick={() => onSelect(d.key)}>
              <span className="diff-icon">{d.icon}</span>
              <span>
                <div className="diff-name">{d.name}</div>
                <div className="diff-desc">{d.desc}</div>
              </span>
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
