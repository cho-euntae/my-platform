import { motion, AnimatePresence } from 'framer-motion'
import { DIFFICULTY } from '../utils/gameConfig'

export default function GameScreen({
  bombLetter,
  input,
  setInput,
  onSubmit,
  onKeyDown,
  timeLeft,
  lives,
  score,
  combo,
  usedWords,
  feedback,
  shake,
  explosion,
  difficulty,
  onBack
}) {
  const diff = DIFFICULTY[difficulty]
  const timePercent = (timeLeft / diff.time) * 100
  const isUrgent = timeLeft <= 3

  return (
    <motion.div
      className={`min-h-screen p-4 flex flex-col items-center justify-center ${shake ? 'animate-shake' : ''}`}
      animate={{ x: shake ? [-8, 8, -5, 5, 0] : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md">
        {/* Header: Score + Lives */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="text-xs font-bold text-dark-sub uppercase mb-1">SCORE</div>
            <div className="text-2xl font-black text-bomb-500">{score}</div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: diff.lives }).map((_, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{
                  opacity: i < lives ? 1 : 0.2,
                  scale: i < lives ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              >
                ❤️
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Combo Display */}
        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              className="text-center mb-4 animate-combo-pop"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-bomb-500/20 to-red-500/20 border border-bomb-500/40 text-sm font-bold text-bomb-500">
                🔥 {combo} COMBO
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bomb + Letter */}
        <motion.div className="text-center mb-6 relative">
          {/* Explosion effect */}
          <AnimatePresence>
            {explosion && (
              <motion.div
                className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-bomb-500/50 to-transparent"
                initial={{ transform: 'translate(-50%, -50%) scale(0)', opacity: 1 }}
                animate={{ transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ pointerEvents: 'none' }}
              />
            )}
          </AnimatePresence>

          {/* Bomb icon */}
          <motion.div
            className={`text-6xl ${isUrgent ? 'drop-shadow-lg' : ''}`}
            style={{
              filter: isUrgent
                ? 'drop-shadow(0 0 20px #EF4444)'
                : 'drop-shadow(0 0 10px rgba(255, 107, 44, 0.4))'
            }}
            animate={isUrgent ? { scale: [1, 1.15, 1] } : { y: [0, -8, 0], rotate: [-3, 3, -3] }}
            transition={{
              duration: isUrgent ? 0.5 : 2,
              repeat: Infinity
            }}
          >
            💣
          </motion.div>

          {/* Letter box */}
          <motion.div
            className="inline-block mt-3 px-8 py-3 rounded-2xl border-2 border-bomb-500/60"
            style={{
              background: `linear-gradient(135deg, rgba(255, 107, 44, 0.2), rgba(245, 158, 11, 0.1))`,
              boxShadow: '0 0 30px rgba(255, 107, 44, 0.15)'
            }}
          >
            <span className="text-4xl font-black text-bomb-500">
              {bombLetter}
            </span>
          </motion.div>
        </motion.div>

        {/* Timer Bar */}
        <div className="h-1 bg-dark-border rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-bomb-500 to-amber-500"
            style={{
              boxShadow: isUrgent ? '0 0 12px #EF4444' : 'none'
            }}
            animate={{ width: `${Math.max(0, timePercent)}%` }}
            transition={{ duration: 0.1, type: 'linear' }}
          />
        </div>

        {/* Input Field */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={`"${bombLetter}" 포함 단어 입력...`}
            autoFocus
            className="flex-1 p-3 rounded-lg bg-dark-card border-2 border-dark-border text-dark-text placeholder-dark-sub focus:outline-none focus:border-bomb-500 transition-all"
          />
          <button
            onClick={onSubmit}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-bomb-500 to-amber-500 text-white font-bold hover:shadow-lg transition-all whitespace-nowrap"
          >
            입력
          </button>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`text-center p-3 rounded-lg mb-4 text-sm font-bold border animate-fade-in-up ${
                feedback.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-500'
                  : feedback.type === 'fail'
                  ? 'bg-red-500/10 border-red-500/30 text-red-500'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
              }`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Used Words */}
        {usedWords.size > 0 && (
          <motion.div
            className="bg-dark-card border border-dark-border rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-xs font-bold text-dark-sub uppercase mb-3">
              사용한 단어 ({usedWords.size}개)
            </div>
            <div className="flex flex-wrap gap-2">
              {[...usedWords].reverse().map((w, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-bomb-500/10 border border-bomb-500/20 text-xs text-dark-sub">
                  {w}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="w-full mt-6 p-2 text-dark-sub hover:text-dark-text transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
        >
          ← 돌아가기
        </motion.button>
      </div>
    </motion.div>
  )
}
