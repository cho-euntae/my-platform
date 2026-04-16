import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

let socket = null

export const initSocket = () => {
  if (socket) return socket

  socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelayMax: 5000,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initSocket()
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// Multiplayer game events
export const joinMultiGameRoom = (roomId) => {
  getSocket().emit('join_room', { roomId })
}

export const leaveMultiGameRoom = () => {
  getSocket().emit('leave_room')
}

export const submitWord = (word) => {
  getSocket().emit('submit_word', { word })
}

export const onGameStart = (callback) => {
  getSocket().on('game_start', callback)
}

export const onBombLetter = (callback) => {
  getSocket().on('bomb_letter', callback)
}

export const onPlayerAnswer = (callback) => {
  getSocket().on('player_answer', callback)
}

export const onGameEnd = (callback) => {
  getSocket().on('game_end', callback)
}

export const onPlayerEliminated = (callback) => {
  getSocket().on('player_eliminated', callback)
}

export default {
  initSocket,
  getSocket,
  disconnectSocket,
  joinMultiGameRoom,
  leaveMultiGameRoom,
  submitWord,
  onGameStart,
  onBombLetter,
  onPlayerAnswer,
  onGameEnd,
  onPlayerEliminated
}
