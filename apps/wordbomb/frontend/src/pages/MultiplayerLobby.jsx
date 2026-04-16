import { motion } from 'framer-motion'

export default function MultiplayerLobby({ difficulty, onStartGame, onBack }) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔄
        </motion.div>
        <h2 className="text-2xl font-bold text-bomb-500 mb-4">멀티플레이 게임방</h2>
        <p className="text-dark-sub mb-8">빠른 진행 중입니다... 다음 업데이트에서 만나요!</p>
        
        <button
          onClick={onBack}
          className="w-full p-3 rounded-lg bg-dark-card border border-dark-border text-dark-text font-bold hover:border-bomb-500"
        >
          홈으로 돌아가기
        </button>
      </div>
    </motion.div>
  )
}
