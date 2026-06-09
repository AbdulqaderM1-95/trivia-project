'use client'

export default function WelcomeScreen({ theme, onToggleTheme, onBegin, onLeaderboard }) {
  return (
    <div id="screen-welcome" className="screen active">
      <div className="card">
        <button className="theme-toggle-btn" onClick={onToggleTheme}>
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        <h1>☠ Tom Riddle&apos;s Test ☠</h1>
        <p className="subtitle">
          Prove yourself worthy of the Dark Lord&apos;s inner circle.
          <br />Answer wisely… or face Nagini&apos;s judgment.
        </p>

        <div className="welcome-btn-row">
          <button className="btn" onClick={onBegin}>
            🐍 Begin the Deatheater&apos;s Test
          </button>
          <button
            className="btn"
            style={{ background: 'linear-gradient(135deg,#1a0040,#2d0060)' }}
            onClick={onLeaderboard}
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
}
