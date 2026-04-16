import express from 'express'
import { validateWord, getAllWords } from '../controllers/wordController.js'

const router = express.Router()

router.get('/', getAllWords)
router.post('/validate', validateWord)

export default router
