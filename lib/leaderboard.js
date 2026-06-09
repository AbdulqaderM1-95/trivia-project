const KEY = 'tr_leaderboard_v2'

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveToLeaderboard(entry) {
  // entry: { name, score, total, difficulty, diffLabel, house, houseName, pct, date }
  try {
    const board = getLeaderboard()
    board.push(entry)
    board.sort((a, b) => b.pct - a.pct || b.score - a.score)
    if (board.length > 20) board.length = 20
    localStorage.setItem(KEY, JSON.stringify(board))
  } catch {
    // localStorage not available (SSR)
  }
}

export function clearLeaderboard() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}
