import express from 'express'
import { createRoom, joinRoom } from '../controllers/roomController.js'

const router = express.Router()

router.post('/', createRoom)
router.post('/:roomId/join', joinRoom)

export default router
