import { isValidWord, getWords } from '../utils/wordDictionary.js'

export const validateWord = (req, res) => {
  try {
    const { word, bombLetter } = req.body

    if (!word || !bombLetter) {
      return res.status(400).json({
        valid: false,
        error: '잘못된 요청입니다'
      })
    }

    const trimmed = word.trim()

    // Check if word is valid
    if (!isValidWord(trimmed)) {
      return res.json({
        valid: false,
        error: '사전에 없는 단어예요!'
      })
    }

    // Check if bomb letter is included
    if (!trimmed.includes(bombLetter)) {
      return res.json({
        valid: false,
        error: `"${bombLetter}" 글자가 포함되어야 해요!`
      })
    }

    res.json({ valid: true })
  } catch (error) {
    console.error('Word validation error:', error)
    res.status(500).json({
      valid: false,
      error: '서버 오류가 발생했습니다'
    })
  }
}

export const getAllWords = (req, res) => {
  try {
    const words = getWords()
    res.json({ words })
  } catch (error) {
    console.error('Get words error:', error)
    res.status(500).json({ words: [] })
  }
}
