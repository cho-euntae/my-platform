export const initializeSocket = (io) => {
  const games = new Map() // roomId -> game state

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`)

    // Multiplayer: Join room
    socket.on('join_room', ({ roomId }) => {
      socket.join(roomId)
      io.to(roomId).emit('player_joined', { playerName: socket.handshake.auth.name })
    })

    // Multiplayer: Start game
    socket.on('start_game', ({ roomId }) => {
      const room = io.sockets.adapter.rooms.get(roomId)
      if (!room) return

      const gameState = {
        roomId,
        players: Array.from(room),
        round: 0,
        status: 'playing'
      }

      games.set(roomId, gameState)
      io.to(roomId).emit('game_start', gameState)
    })

    // Multiplayer: Submit word
    socket.on('submit_word', ({ word, roomId }) => {
      const gameState = games.get(roomId)
      if (!gameState) return

      io.to(roomId).emit('player_answer', {
        playerName: socket.handshake.auth.name,
        word,
        timestamp: Date.now()
      })
    })

    // Multiplayer: Leave room
    socket.on('leave_room', ({ roomId }) => {
      socket.leave(roomId)
      io.to(roomId).emit('player_left', { playerName: socket.handshake.auth.name })
      
      const room = io.sockets.adapter.rooms.get(roomId)
      if (!room || room.size === 0) {
        games.delete(roomId)
      }
    })

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`)
    })
  })
}
