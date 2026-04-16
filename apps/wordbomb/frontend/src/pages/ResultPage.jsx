import { motion } from 'framer-motion'
import { DIFFICULTY } from '../utils/gameConfig'
import { submitScore } from '../utils/api'

export default function ResultPage({ result, difficulty, gameMode, onPlayAgain, onBackHome }) {
  const [playerName, setPlayerName] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  const diff = DIFFICULTY[difficulty]
  const isHighScore = result.score > 100
  const icon = isHighScore ? '🏆' : result.score > 50 ? '🎉' : '💥'

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return
    
    setSubmitting(true)
    await submitScore(playerName, result.score, difficulty, gameMode)
    setSubmitting(false)
    onPlayAgain()
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md">
        {/* Result Icon */}
        <motion.div
          className="text-8xl text-center mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>

        {/* Result Title */}
        <h1 className="text-3xl font-black text-center mb-2">
          {isHighScore ? '신기록!' : '게임 오버'}
        </h1>
        <p className="text-center text-dark-sub text-sm mb-8">
          {diff.label} 모드
        </p>

        {/* Score Card */}
        <motion.div
          className="bg-dark-card border border-dark-border rounded-2xl p-8 mb-6"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1, transition: { delay: 0.2 } }
          }}
          initial="hidden"
          animate="show"
        >
          <div className="text-5xl font-black text-bomb-500 text-center mb-2">
            {result.score}
          </div>
          <div className="text-center text-dark-sub text-sm mb-6">점</div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '라운드', value: result.round, icon: '🎯' },
              { label: '최대 콤보', value: result.maxCombo, icon: '🔥' },
              { label: '사용 단어', value: result.usedWords, icon: '📝' }
            ].map((stat, i) => (
              <div key={i} className="bg-dark-border/40 rounded-lg p-3 text-center">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-dark-sub">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Name Input */}
        <motion.input
          type="text"
          placeholder="플레이어 이름 입력..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-3 rounded-lg bg-dark-card border border-dark-border text-dark-text placeholder-dark-sub focus:outline-none focus:border-bomb-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        {/* Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleSubmitScore}
            disabled={submitting || !playerName.trim()}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-bomb-500 to-amber-500 text-white font-bold hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {submitting ? '저장 중...' : '점수 저장 🔥'}
          </button>
          <button
            onClick={onPlayAgain}
            className="w-full p-3 rounded-lg bg-dark-card border border-dark-border text-dark-text font-bold hover:border-bomb-500 transition-all"
          >
            다시 도전
          </button>
          <button
            onClick={onBackHome}
            className="w-full p-3 rounded-lg bg-dark-card/50 border border-dark-border/50 text-dark-sub font-bold hover:text-dark-text transition-all"
          >
            홈으로
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

import React from 'react'
