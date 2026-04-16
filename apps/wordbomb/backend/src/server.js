import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import wordRoutes from './routes/wordRoutes.js'
import leaderboardRoutes from './routes/leaderboardRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import { initializeSocket } from './utils/socketManager.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// API Routes
app.use('/api/words', wordRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/rooms', roomRoutes)

// Socket.io initialization
initializeSocket(io)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`🎮 Game server ready for connections`)
})

export default server
