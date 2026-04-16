import { useState, useEffect } from 'react'
import MenuPage from './pages/MenuPage'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import MultiplayerLobby from './pages/MultiplayerLobby'
import MultiplayerGame from './pages/MultiplayerGame'
import TypingPracticePage from './pages/TypingPracticePage'

export default function App() {
  const [screen, setScreen] = useState('menu')
  const [gameMode, setGameMode] = useState('single') // 'single' or 'multi'
  const [difficulty, setDifficulty] = useState('normal')
  const [gameResult, setGameResult] = useState(null)

  const handleStartGame = (mode, diff) => {
    setGameMode(mode)
    setDifficulty(diff)
    if (mode === 'single') {
      setScreen('game')
    } else {
      setScreen('lobby')
    }
  }

  const handleGameEnd = (result) => {
    setGameResult(result)
    setScreen('result')
  }

  const handleBackHome = () => {
    setScreen('home')
    setGameResult(null)
  }

  const handleBackMenu = () => {
    setScreen('menu')
    setGameResult(null)
  }

  const handleSelectMode = (mode) => {
    if (mode === 'bomb') setScreen('home')
    else if (mode === 'typing') setScreen('typing')
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      {screen === 'menu' && (
        <MenuPage onSelectMode={handleSelectMode} />
      )}
      {screen === 'typing' && (
        <TypingPracticePage onBack={handleBackMenu} />
      )}
      {screen === 'home' && (
        <HomePage onStartGame={handleStartGame} onBack={handleBackMenu} />
      )}
      {screen === 'game' && (
        <GamePage 
          difficulty={difficulty}
          onGameEnd={handleGameEnd}
          onBack={handleBackHome}
        />
      )}
      {screen === 'result' && (
        <ResultPage 
          result={gameResult}
          difficulty={difficulty}
          gameMode={gameMode}
          onPlayAgain={() => setScreen('game')}
          onBackHome={handleBackHome}
        />
      )}
      {screen === 'lobby' && (
        <MultiplayerLobby
          difficulty={difficulty}
          onStartGame={() => setScreen('multi-game')}
          onBack={handleBackHome}
        />
      )}
      {screen === 'multi-game' && (
        <MultiplayerGame
          difficulty={difficulty}
          onGameEnd={handleGameEnd}
          onBack={handleBackHome}
        />
      )}
    </div>
  )
}
