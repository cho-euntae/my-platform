// In-memory leaderboard (production에서는 DB 사용)
let leaderboard = []

export const getLeaderboard = (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const sorted = [...leaderboard]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
    
    res.json({ leaderboard: sorted })
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ leaderboard: [] })
  }
}

export const submitScore = (req, res) => {
  try {
    const { playerName, score, difficulty, gameMode } = req.body

    if (!playerName || !score) {
      return res.status(400).json({
        success: false,
        error: '플레이어 이름과 점수가 필요합니다'
      })
    }

    const entry = {
      id: Date.now(),
      playerName,
      score,
      difficulty,
      gameMode,
      timestamp: new Date()
    }

    leaderboard.push(entry)

    // 최대 1000개까지만 유지
    if (leaderboard.length > 1000) {
      leaderboard = leaderboard.slice(-1000)
    }

    res.json({
      success: true,
      rank: leaderboard
        .filter(e => e.score >= score)
        .length + 1
    })
  } catch (error) {
    console.error('Submit score error:', error)
    res.status(500).json({
      success: false,
      error: '점수 저장에 실패했습니다'
    })
  }
}
