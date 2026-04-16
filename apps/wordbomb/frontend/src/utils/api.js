import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
})

// Word validation
export const validateWord = async (word, bombLetter) => {
  try {
    const res = await api.post('/words/validate', { word, bombLetter })
    return res.data
  } catch (error) {
    console.error('Word validation error:', error)
    return { valid: false, error: error.message }
  }
}

// Get all words
export const getAllWords = async () => {
  try {
    const res = await api.get('/words')
    return res.data
  } catch (error) {
    console.error('Get words error:', error)
    return { words: [] }
  }
}

// Leaderboard
export const getLeaderboard = async (limit = 10) => {
  try {
    const res = await api.get(`/leaderboard?limit=${limit}`)
    return res.data
  } catch (error) {
    console.error('Leaderboard error:', error)
    return { leaderboard: [] }
  }
}

// Submit score
export const submitScore = async (playerName, score, difficulty, gameMode) => {
  try {
    const res = await api.post('/leaderboard', { playerName, score, difficulty, gameMode })
    return res.data
  } catch (error) {
    console.error('Submit score error:', error)
    return { success: false, error: error.message }
  }
}

// Multiplayer - Create room
export const createRoom = async (playerName, difficulty) => {
  try {
    const res = await api.post('/rooms', { playerName, difficulty })
    return res.data
  } catch (error) {
    console.error('Create room error:', error)
    return { success: false, error: error.message }
  }
}

// Multiplayer - Join room
export const joinRoom = async (roomId, playerName) => {
  try {
    const res = await api.post(`/rooms/${roomId}/join`, { playerName })
    return res.data
  } catch (error) {
    console.error('Join room error:', error)
    return { success: false, error: error.message }
  }
}

export default api
