export const DIFFICULTY = {
  easy: {
    label: '쉬움',
    time: 12,
    minLen: 1,
    color: '#3FB950',
    lives: 5
  },
  normal: {
    label: '보통',
    time: 8,
    minLen: 2,
    color: '#58A6FF',
    lives: 4
  },
  hard: {
    label: '어려움',
    time: 5,
    minLen: 2,
    color: '#F85149',
    lives: 3
  }
}

export const BOMB_LETTERS = [
  '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
  '고', '노', '도', '로', '모', '보', '소', '오', '조', '포', '호',
  '구', '누', '두', '루', '무', '부', '수', '우', '주', '추', '후',
  '기', '니', '디', '리', '미', '비', '시', '이', '지', '키', '피',
  '거', '너', '더', '러', '머', '버', '서', '어', '저', '커', '터',
  '대', '래', '매', '배', '새', '재', '해',
  '과', '관', '광', '강', '공', '국', '금', '기',
  '전', '정', '제', '조', '중', '진',
  '인', '일', '임',
  '상', '생', '선', '설', '성',
  '화', '환', '활',
]

export const getRandomLetter = () => {
  return BOMB_LETTERS[Math.floor(Math.random() * BOMB_LETTERS.length)]
}

export const COLORS = {
  bg: '#0B0E14',
  card: '#141921',
  border: '#1E2736',
  text: '#E2E8F0',
  sub: '#64748B',
  accent: '#F59E0B',
  danger: '#EF4444',
  success: '#22C55E',
  bomb: '#FF6B2C'
}
