import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameScreen from '../components/GameScreen'
import { DIFFICULTY, getRandomLetter } from '../utils/gameConfig'
import { validateWord, getAllWords } from '../utils/api'

export default function GamePage({ difficulty, onGameEnd, onBack }) {
  const [bombLetter, setBombLetter] = useState('')
  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [lives, setLives] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [usedWords, setUsedWords] = useState(new Set())
  const [feedback, setFeedback] = useState(null)
  const [shake, setShake] = useState(false)
  const [explosion, setExplosion] = useState(false)
  const [round, setRound] = useState(0)
  const [allWords, setAllWords] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  
  const timerRef = useRef(null)
  const diff = DIFFICULTY[difficulty]

  // Load words
  useEffect(() => {
    const loadWords = async () => {
      const data = await getAllWords()
      setAllWords(data.words || [])
    }
    loadWords()
  }, [])

  // Initialize game
  useEffect(() => {
    if (allWords.length > 0 && !gameStarted) {
      setLives(diff.lives)
      setScore(0)
      setCombo(0)
      setMaxCombo(0)
      setUsedWords(new Set())
      setRound(0)
      nextRound()
      setGameStarted(true)
    }
  }, [allWords])

  // Timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return

    timerRef.current = setTimeout(() => {
      setTimeLeft(t => {
        if (t - 0.1 <= 0) {
          handleTimeUp()
          return 0
        }
        return t - 0.1
      })
    }, 100)

    return () => clearTimeout(timerRef.current)
  }, [timeLeft, gameStarted])

  const nextRound = () => {
    const letter = getRandomLetter()
    setBombLetter(letter)
    setTimeLeft(diff.time)
    setInput('')
    setFeedback(null)
    setRound(r => r + 1)
    setExplosion(false)
  }

  const handleTimeUp = () => {
    setExplosion(true)
    setShake(true)
    
    setLives(l => {
      const next = l - 1
      if (next <= 0) {
        setTimeout(() => {
          onGameEnd({
            score,
            round,
            maxCombo,
            usedWords: usedWords.size,
            difficulty
          })
        }, 800)
      } else {
        setCombo(0)
        setFeedback({ type: 'fail', message: '💥 시간 초과!' })
        setTimeout(() => {
          setShake(false)
          nextRound()
        }, 1200)
      }
      return next
    })
  }

  const handleSubmit = async () => {
    const word = input.trim()
    if (!word) return

    if (word.length < diff.minLen) {
      setFeedback({
        type: 'warn',
        message: `${diff.minLen}글자 이상 입력하세요`
      })
      triggerShake()
      return
    }

    if (!word.includes(bombLetter)) {
      setFeedback({
        type: 'warn',
        message: `"${bombLetter}" 글자가 포함되어야 해요!`
      })
      triggerShake()
      return
    }

    if (usedWords.has(word)) {
      setFeedback({
        type: 'warn',
        message: '이미 사용한 단어예요!'
      })
      triggerShake()
      return
    }

    // Validate with backend
    const validation = await validateWord(word, bombLetter)
    if (!validation.valid) {
      setFeedback({
        type: 'warn',
        message: validation.error || '사전에 없는 단어예요!'
      })
      triggerShake()
      return
    }

    // Success!
    const newCombo = combo + 1
    const wordScore = word.length * 10 + (newCombo > 1 ? newCombo * 5 : 0)
    
    setScore(s => s + wordScore)
    setCombo(newCombo)
    setMaxCombo(m => Math.max(m, newCombo))
    setUsedWords(prev => new Set([...prev, word]))
    setFeedback({
      type: 'success',
      message: `+${wordScore}점${newCombo > 1 ? ` (${newCombo}콤보!)` : ''}`
    })

    setInput('')
    setTimeout(() => nextRound(), 600)
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          💣
        </motion.div>
      </div>
    )
  }

  return (
    <GameScreen
      bombLetter={bombLetter}
      input={input}
      setInput={setInput}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      timeLeft={timeLeft}
      lives={lives}
      score={score}
      combo={combo}
      usedWords={usedWords}
      feedback={feedback}
      shake={shake}
      explosion={explosion}
      difficulty={difficulty}
      onBack={onBack}
    />
  )
}
