import { motion } from 'framer-motion'

export default function MenuPage({ onSelectMode }) {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.08 }
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
        <motion.div className="text-center mb-10" variants={item}>
          <motion.div
            className="text-7xl mb-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            ⌨️
          </motion.div>
          <h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-bomb-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
            한글 워드 플레이
          </h1>
          <p className="text-dark-sub text-sm tracking-wide">
            플레이 모드를 선택하세요
          </p>
        </motion.div>

        <motion.div className="space-y-4">
          <motion.button
            onClick={() => onSelectMode('bomb')}
            className="w-full p-5 rounded-2xl bg-dark-card border border-dark-border text-left hover:border-bomb-500 transition-all hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={item}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">💣</div>
              <div className="flex-1">
                <div className="text-lg font-black">단어 폭탄</div>
                <div className="text-xs text-dark-sub mt-1">
                  제한 시간 안에 글자 포함 단어 입력
                </div>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => onSelectMode('typing')}
            className="w-full p-5 rounded-2xl bg-dark-card border border-dark-border text-left hover:border-amber-500 transition-all hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={item}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">⌨️</div>
              <div className="flex-1">
                <div className="text-lg font-black">타자연습</div>
                <div className="text-xs text-dark-sub mt-1">
                  제시 단어를 그대로 입력 · 속도/정확도 측정
                </div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
