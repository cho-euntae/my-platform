import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getAllWords } from '../utils/api'
import { countKeystrokes, LONG_TEXTS_BY_LENGTH } from '../utils/typing'

const SESSION_LENGTH = 20

function pickRandom(pool, count) {
  const copy = [...pool]
  const out = []
  while (out.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length)
    out.push(copy.splice(idx, 1)[0])
  }
  return out
}

function pickOne(pool) {
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function TypingPracticePage({ onBack }) {
  const [mode, setMode] = useState('word') // 'word' | 'long'
  const [longLength, setLongLength] = useState('short') // 'short' | 'medium' | 'long'
  const [words, setWords] = useState([])
  const [queue, setQueue] = useState([])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [longText, setLongText] = useState('')
  const [startedAt, setStartedAt] = useState(null)
  const [endedAt, setEndedAt] = useState(null)
  const [correctKeys, setCorrectKeys] = useState(0)
  const [totalKeys, setTotalKeys] = useState(0)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      const data = await getAllWords()
      setWords(data.words || [])
    }
    load()
  }, [])

  useEffect(() => {
    if (mode === 'word' && words.length > 0 && queue.length === 0) {
      setQueue(pickRandom(words, SESSION_LENGTH))
    }
    if (mode === 'long' && !longText) {
      setLongText(pickOne(LONG_TEXTS_BY_LENGTH[longLength]))
    }
  }, [mode, words, longLength, longText])

  useEffect(() => {
    inputRef.current?.focus()
  }, [mode, queue, longText, finished])

  const resetStats = () => {
    setInput('')
    setIndex(0)
    setStartedAt(null)
    setEndedAt(null)
    setCorrectKeys(0)
    setTotalKeys(0)
    setFinished(false)
  }

  const switchMode = (next) => {
    if (next === mode) return
    resetStats()
    setQueue([])
    setLongText('')
    setMode(next)
  }

  const reset = () => {
    resetStats()
    if (mode === 'word') {
      setQueue(pickRandom(words, SESSION_LENGTH))
    } else {
      setLongText(pickOne(LONG_TEXTS_BY_LENGTH[longLength]))
    }
  }

  const changeLongLength = (next) => {
    if (next === longLength) return
    setLongLength(next)
    resetStats()
    setLongText(pickOne(LONG_TEXTS_BY_LENGTH[next]))
  }

  const current = mode === 'word' ? queue[index] || '' : longText

  const handleWordChange = (e) => {
    const value = e.target.value
    if (!startedAt) setStartedAt(Date.now())
    if (value.length > input.length) {
      const added = value.slice(input.length)
      setTotalKeys((k) => k + countKeystrokes(added))
    }
    if (value === current) {
      setCorrectKeys((c) => c + countKeystrokes(current))
      setInput('')
      if (index + 1 >= queue.length) {
        setEndedAt(Date.now())
        setFinished(true)
      } else {
        setIndex((i) => i + 1)
      }
      return
    }
    setInput(value)
  }

  const handleLongChange = (e) => {
    const value = e.target.value
    if (!startedAt) setStartedAt(Date.now())
    if (value.length > input.length) {
      const added = value.slice(input.length)
      setTotalKeys((k) => k + countKeystrokes(added))
    }
    setInput(value)
    if (value === current) {
      setCorrectKeys(countKeystrokes(current))
      setEndedAt(Date.now())
      setFinished(true)
    }
  }

  const stats = useMemo(() => {
    const end = endedAt || Date.now()
    if (!startedAt) return { kpm: 0, wpm: 0, accuracy: 100, elapsed: 0 }
    const elapsedMs = Math.max(end - startedAt, 1)
    const elapsedMin = elapsedMs / 1000 / 60

    let liveCorrectKeys = correctKeys
    if (mode === 'long') {
      let matched = 0
      for (let i = 0; i < input.length && i < current.length; i++) {
        if (input[i] === current[i]) matched++
        else break
      }
      liveCorrectKeys = countKeystrokes(current.slice(0, matched))
    }

    const kpm = Math.round(liveCorrectKeys / elapsedMin)
    const wpm = Math.round(liveCorrectKeys / 5 / elapsedMin)
    const accuracy =
      totalKeys === 0
        ? 100
        : Math.round(Math.min(liveCorrectKeys / totalKeys, 1) * 100)
    return { kpm, wpm, accuracy, elapsed: Math.round(elapsedMs / 1000) }
  }, [startedAt, endedAt, correctKeys, totalKeys, mode, input, current])

  const loading =
    (mode === 'word' && queue.length === 0) ||
    (mode === 'long' && !longText)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-5xl"
        >
          ⌨️
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="text-sm text-dark-sub hover:text-dark-text transition"
          >
            ← 메뉴
          </button>
          <div className="flex gap-1 p-1 rounded-xl bg-dark-card border border-dark-border">
            <ModeTab
              active={mode === 'word'}
              onClick={() => switchMode('word')}
              label="단어"
            />
            <ModeTab
              active={mode === 'long'}
              onClick={() => switchMode('long')}
              label="장문"
            />
          </div>
          <div className="text-xs text-dark-sub w-12 text-right">
            {mode === 'word'
              ? `${Math.min(index + 1, queue.length)} / ${queue.length}`
              : ''}
          </div>
        </div>

        {mode === 'long' && (
          <div className="flex gap-1 p-1 mb-5 rounded-xl bg-dark-card border border-dark-border w-fit mx-auto">
            <ModeTab
              active={longLength === 'short'}
              onClick={() => changeLongLength('short')}
              label="짧게"
            />
            <ModeTab
              active={longLength === 'medium'}
              onClick={() => changeLongLength('medium')}
              label="중간"
            />
            <ModeTab
              active={longLength === 'long'}
              onClick={() => changeLongLength('long')}
              label="길게"
            />
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 mb-6">
          <StatCard label="타수" value={`${stats.kpm}타`} highlight />
          <StatCard label="WPM" value={stats.wpm} />
          <StatCard label="정확도" value={`${stats.accuracy}%`} />
          <StatCard label="경과" value={`${stats.elapsed}s`} />
        </div>

        {!finished ? (
          mode === 'word' ? (
            <>
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-card border border-dark-border rounded-2xl p-8 mb-5 text-center"
              >
                <div className="text-xs text-dark-sub mb-2 tracking-widest">
                  다음 단어를 입력하세요
                </div>
                <div className="text-5xl font-black tracking-wide">
                  <CharDisplay target={current} typed={input} />
                </div>
              </motion.div>

              <input
                ref={inputRef}
                value={input}
                onChange={handleWordChange}
                placeholder="여기에 입력..."
                className="w-full px-5 py-4 rounded-xl bg-dark-card border border-dark-border text-lg font-bold outline-none focus:border-amber-500 transition"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-card border border-dark-border rounded-2xl p-6 mb-5"
              >
                <div className="text-xs text-dark-sub mb-3 tracking-widest">
                  장문을 그대로 입력하세요
                </div>
                <div className="text-lg leading-relaxed font-bold whitespace-pre-wrap break-words">
                  <CharDisplay target={current} typed={input} />
                </div>
              </motion.div>

              <textarea
                ref={inputRef}
                value={input}
                onChange={handleLongChange}
                placeholder="여기에 입력..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-dark-card border border-dark-border text-base font-medium outline-none focus:border-amber-500 transition resize-none leading-relaxed"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <div className="text-xl font-black mb-6">완료!</div>
            <div className="grid grid-cols-4 gap-3 mb-6">
              <StatCard label="타수" value={`${stats.kpm}타`} highlight />
              <StatCard label="WPM" value={stats.wpm} />
              <StatCard label="정확도" value={`${stats.accuracy}%`} />
              <StatCard label="시간" value={`${stats.elapsed}s`} />
            </div>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
              >
                다시하기
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl bg-dark-card border border-dark-border font-bold hover:border-dark-sub transition"
              >
                메뉴로
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ModeTab({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${
        active
          ? 'bg-amber-500 text-black'
          : 'text-dark-sub hover:text-dark-text'
      }`}
    >
      {label}
    </button>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-3 text-center border ${
        highlight
          ? 'bg-amber-500/10 border-amber-500/40'
          : 'bg-dark-card border-dark-border'
      }`}
    >
      <div className="text-[10px] text-dark-sub tracking-widest">{label}</div>
      <div
        className={`text-2xl font-black mt-1 ${
          highlight ? 'text-amber-400' : ''
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function CharDisplay({ target, typed }) {
  return (
    <span>
      {target.split('').map((ch, i) => {
        const t = typed[i]
        const state = t === undefined ? 'pending' : t === ch ? 'ok' : 'bad'
        const color =
          state === 'ok'
            ? 'text-amber-400'
            : state === 'bad'
            ? 'text-red-500'
            : 'text-dark-sub'
        return (
          <span key={i} className={color}>
            {ch}
          </span>
        )
      })}
    </span>
  )
}
