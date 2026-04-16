// In-memory game rooms
const rooms = new Map()

export const createRoom = (req, res) => {
  const { playerName, difficulty } = req.body
  const roomId = Math.random().toString(36).substring(7)

  rooms.set(roomId, {
    id: roomId,
    host: playerName,
    difficulty,
    players: [playerName],
    status: 'waiting',
    createdAt: Date.now()
  })

  res.json({ success: true, roomId })
}

export const joinRoom = (req, res) => {
  const { roomId } = req.params
  const { playerName } = req.body

  const room = rooms.get(roomId)
  if (!room) {
    return res.status(404).json({
      success: false,
      error: '게임방을 찾을 수 없습니다'
    })
  }

  if (room.status !== 'waiting') {
    return res.status(400).json({
      success: false,
      error: '이미 진행중인 게임입니다'
    })
  }

  room.players.push(playerName)
  res.json({ success: true, room })
}
