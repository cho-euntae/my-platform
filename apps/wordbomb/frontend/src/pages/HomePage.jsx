import { motion } from 'framer-motion'
import { DIFFICULTY } from '../utils/gameConfig'

export default function HomePage({ onStartGame, onBack }) {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="w-full max-w-md">
        {onBack && (
          <motion.button
            onClick={onBack}
            className="text-sm text-dark-sub hover:text-dark-text transition mb-4"
            variants={item}
          >
            ← 메뉴
          </motion.button>
        )}
        {/* Header */}
        <motion.div className="text-center mb-8" variants={item}>

          <motion.div
            className="text-8xl mb-2"
            animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💣
          </motion.div>
          <h1 className="text-4xl font-black mb-1 bg-gradient-to-r from-bomb-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
            단어 폭탄
          </h1>
          <p className="text-dark-sub text-sm tracking-wide">
            제한 시간 안에 해당 글자가 포함된 단어를 입력하세요!
          </p>
        </motion.div>

        {/* Rules Card */}
        <motion.div
          className="bg-dark-card border border-dark-border rounded-2xl p-5 mb-8"
          variants={item}
        >
          <div className="text-sm font-bold text-bomb-500 mb-3">📖 게임 규칙</div>
          <div className="space-y-2 text-sm text-dark-sub leading-relaxed">
            <div>🔤 제시된 <span className="text-bomb-500 font-bold">글자가 포함된 단어</span>를 입력</div>
            <div>⏱️ 시간이 다 되면 <span className="text-red-500 font-bold">HP 감소</span></div>
            <div>🔥 연속 정답 시 <span className="text-amber-500 font-bold">콤보 보너스</span></div>
            <div>❌ 같은 단어는 두 번 사용 불가</div>
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <motion.div className="space-y-3 mb-6">
          {Object.entries(DIFFICULTY).map(([key, val]) => (
            <motion.button
              key={key}
              onClick={() => onStartGame('single', key)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-card border border-dark-border hover:border-current transition-all hover:shadow-lg"
              style={{ borderColor: `${val.color}30` }}
              whileHover={{ scale: 1.02, borderColor: val.color }}
              whileTap={{ scale: 0.98 }}
              variants={item}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shadow-lg"
                  style={{ background: val.color }}
                />
                <span className="text-base font-bold">{val.label}</span>
              </div>
              <div className="text-xs text-dark-sub">❤️ {val.lives} · ⏱️ {val.time}초</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Multiplayer Button */}
        <motion.button
          onClick={() => onStartGame('multi', 'normal')}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          variants={item}
        >
          👥 멀티플레이 (준비중)
        </motion.button>
      </div>
    </motion.div>
  )
}
