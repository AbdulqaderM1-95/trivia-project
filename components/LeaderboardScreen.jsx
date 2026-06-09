'use client'
import { HOUSE_ICONS } from '@/lib/questions'

export default function LeaderboardScreen({ entries, onBack, onClear }) {
  return (
    <div className="screen active">
      <div className="card">
        <h2>🏆 Hall of Infamy</h2>
        <p className="subtitle">The Dark Lord&apos;s most devoted servants.</p>

        {entries.length === 0 ? (
          <p className="leaderboard-empty">No scores yet. Be the first to prove yourself.</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>House</th>
                <th>Score</th>
                <th>%</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i}>
                  <td className="rank">#{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{HOUSE_ICONS[e.house] || '☠'}</td>
                  <td>{e.score}/{e.total}</td>
                  <td>{e.pct}%</td>
                  <td>{e.diffLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="btn-row">
          <button className="btn" onClick={onBack}>← Back</button>
          {entries.length > 0 && (
            <button
              className="btn"
              style={{ borderColor: '#ff4444', color: '#ff4444' }}
              onClick={onClear}
            >
              🗑 Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
