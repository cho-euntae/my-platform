# 🎮 단어 폭탄 - 설치 및 실행 가이드

## ⚡ 5분 빠른 시작

### 1. 저장소 클론 및 의존성 설치

```bash
# 프로젝트 루트로 이동
cd word-bomb

# 모든 의존성 설치
npm install

# 또는 pnpm 사용
pnpm install
```

### 2. 환경 변수 설정

```bash
# 프론트엔드
cp frontend/.env.example frontend/.env

# 백엔드
cp backend/.env.example backend/.env
```

### 3. 개발 서버 실행 (완전 자동)

```bash
npm run dev
```

자동으로 다음 서버가 시작됩니다:
- ✅ 프론트엔드: http://localhost:5173
- ✅ 백엔드: http://localhost:3001

---

## 📁 프로젝트 구조 한눈에 보기

```
word-bomb/
│
├── 🎨 frontend/                    # React + Vite + Tailwind 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   └── GameScreen.jsx      # 게임 UI 컴포넌트
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # 홈 (난이도 선택)
│   │   │   ├── GamePage.jsx        # 게임 플레이
│   │   │   ├── ResultPage.jsx      # 결과 화면
│   │   │   ├── MultiplayerLobby.jsx
│   │   │   └── MultiplayerGame.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── gameConfig.js       # 게임 설정 (난이도, 글자 등)
│   │   │   ├── api.js              # REST API 클라이언트
│   │   │   └── socketManager.js    # Socket.io 관리
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css         # 전역 Tailwind 스타일
│   │   │
│   │   ├── App.jsx                 # 메인 라우팅 & 상태 관리
│   │   └── main.jsx                # 엔트리포인트
│   │
│   ├── vite.config.js              # Vite 설정
│   ├── tailwind.config.js          # Tailwind 스타일 설정
│   ├── postcss.config.js
│   └── package.json
│
├── 🔧 backend/                     # Node.js + Express 백엔드
│   ├── src/
│   │   ├── routes/
│   │   │   ├── wordRoutes.js       # 단어 검증 엔드포인트
│   │   │   ├── leaderboardRoutes.js # 랭킹 엔드포인트
│   │   │   └── roomRoutes.js       # 게임방 엔드포인트
│   │   │
│   │   ├── controllers/
│   │   │   ├── wordController.js   # 단어 검증 로직
│   │   │   ├── leaderboardController.js
│   │   │   └── roomController.js
│   │   │
│   │   ├── utils/
│   │   │   ├── wordDictionary.js   # 한국어 단어 검증
│   │   │   └── socketManager.js    # Socket.io 게임 로직
│   │   │
│   │   ├── middleware/             # (준비중)
│   │   └── config/                 # (준비중)
│   │
│   ├── server.js                   # Express 서버 진입점
│   └── package.json
│
├── 📖 dev-server.js                # 개발 실행 스크립트 (자동 시작)
├── package.json                    # 루트 워크스페이스 설정
│
├── 📚 README.md                    # 프로젝트 개요
├── 📚 DEPLOYMENT.md                # 배포 가이드
├── 📚 QUICK_START.md               # 이 파일
│
└── .gitignore
```

---

## 🚀 개별 실행 방법

### 백엔드만 실행

```bash
npm run backend
# 또는
cd backend
npm run dev
```

### 프론트엔드만 실행

```bash
npm run frontend
# 또는
cd frontend
npm run dev
```

---

## 🎯 주요 기능 및 파일 연결

### 1️⃣ 게임 시작 화면
- **파일**: `frontend/src/pages/HomePage.jsx`
- **기능**: 난이도 선택, 멀티플레이 로비
- **역할**: 게임 모드 선택 후 게임 시작

### 2️⃣ 게임 플레이
- **파일**: `frontend/src/pages/GamePage.jsx`
- **기능**: 
  - 타이머 관리
  - 단어 입력 및 검증 (백엔드 API 호출)
  - 점수 계산, 콤보 시스템
  - 생명 시스템 (HP)
- **백엔드**: `backend/src/controllers/wordController.js` → 단어 검증

### 3️⃣ 애니메이션
- **파일**: `frontend/src/components/GameScreen.jsx`
- **라이브러리**: Framer Motion
- **이펙트**:
  - 💣 폭탄 떠다니기
  - 💥 폭발 애니메이션
  - 🌪️ 화면 진동
  - ✨ 콤보 팝업

### 4️⃣ 단어 검증 (핵심 로직)
```
[클라이언트 입력] 
  ↓
frontend: GamePage.jsx 에서 validateWord() 호출
  ↓
backend: POST /api/words/validate
  ↓
utils/wordDictionary.js 에서 단어 확인
  ↓
[검증 결과 반환]
```

### 5️⃣ 랭킹 시스템
- **저장**: `resultPage.jsx` → `submitScore()` 호출
- **조회**: 백엔드 in-memory 저장소
- **API**: `POST/GET /api/leaderboard`

### 6️⃣ 멀티플레이 (준비중)
- **Socket.io**: `backend/src/utils/socketManager.js`
- **클라이언트**: `frontend/src/utils/socketManager.js`
- **기능**: 실시간 턴제 게임

---

## 📊 데이터 흐름

### 싱글플레이 흐름

```
사용자
  ↓ 난이도 선택
GamePage.jsx
  ↓ 게임 시작
  ├─ bombLetter 생성
  ├─ timeLeft, lives, score 초기화
  └─ GameScreen 렌더링
      ↓ 사용자 입력
      ↓ [Enter] 또는 [버튼] 클릭
HandleSubmit()
  ├─ word 길이 확인
  ├─ bombLetter 포함 확인
  ├─ 중복 단어 확인
  └─ validateWord() 호출 (API)
      ↓ POST /api/words/validate
      ↓ backend: isValidWord() 확인
      ↓ 응답 반환
      ↓
  성공? ✅
  ├─ score += 점수 계산
  ├─ combo++
  ├─ usedWords.add(word)
  └─ Feedback 표시 후 다음 라운드
  
  실패? ❌
  ├─ Feedback 표시
  └─ triggerShake()

게임 종료 (timeLeft <= 0 && lives <= 0)
  ↓ ResultPage.jsx
  ├─ 최종 점수 표시
  ├─ 통계 표시
  └─ submitScore() → 랭킹 저장
```

---

## 🎨 스타일 체계

### Tailwind CSS 커스텀 클래스

**색상**:
```css
/* Dark 테마 */
.bg-dark-bg     /* #0B0E14 */
.bg-dark-card   /* #141921 */
.border-dark-border /* #1E2736 */
.text-dark-text /* #E2E8F0 */
.text-dark-sub  /* #64748B */

/* 폭탄 테마 */
.bg-bomb-500    /* #FF6B2C (주요) */
.text-bomb-500
```

**Layout**:
```jsx
// 전형적인 구조
<div className="min-h-screen p-4 flex flex-col items-center">
  <div className="w-full max-w-md">
    {/* 콘텐츠 */}
  </div>
</div>
```

---

## 🔧 환경 변수 설정

### 프론트엔드 (.env)
```
# API 서버 주소
VITE_API_URL=http://localhost:3001/api

# Socket.io 서버 주소
VITE_SOCKET_URL=http://localhost:3001
```

### 백엔드 (.env)
```
# 포트
PORT=3001

# 프론트엔드 주소 (CORS)
FRONTEND_URL=http://localhost:5173

# 환경
NODE_ENV=development

# (선택) 데이터베이스 - 나중에 추가
# MONGODB_URI=mongodb://...
# REDIS_URL=redis://...
```

---

## 🧪 테스트 방법

### 1. 게임 플레이 테스트

```bash
# 1. 서버 시작
npm run dev

# 2. 브라우저 열기
# http://localhost:5173

# 3. 난이도 선택 후 테스트
# - 제시 글자가 포함된 단어 입력
# - 정답/오답 확인
# - 타이머 작동 확인
# - HP 감소 확인
```

### 2. API 테스트

```bash
# 단어 검증
curl -X POST http://localhost:3001/api/words/validate \
  -H "Content-Type: application/json" \
  -d '{"word": "사과", "bombLetter": "과"}'

# 랭킹 조회
curl http://localhost:3001/api/leaderboard

# 헬스 체크
curl http://localhost:3001/health
```

### 3. Socket.io 테스트 (브라우저 콘솔)

```javascript
const socket = io('http://localhost:3001')
socket.on('connect', () => console.log('연결됨!'))
socket.emit('join_room', { roomId: 'test-room' })
```

---

## 🐛 일반적인 문제 해결

### "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

### "API 연결 오류"
- ✅ 백엔드 서버 실행 중 확인
- ✅ `.env` 파일의 `VITE_API_URL` 확인
- ✅ 브라우저 DevTools 콘솔 에러 확인

### "Tailwind 스타일 미적용"
```bash
# Vite 재시작
npm run dev

# 또는 캐시 삭제
rm -rf node_modules/.vite
npm run dev
```

### "npm install 오류"
```bash
# Node 버전 확인 (18.0.0 이상 필요)
node -v

# 캐시 초기화
npm cache clean --force

# 재설치
npm install
```

---

## 📱 배포 빠른 링크

- **프론트엔드**: [Vercel](https://vercel.com) - [배포 가이드](./DEPLOYMENT.md#-프론트엔드-배포-vercel)
- **백엔드**: [Railway](https://railway.app) - [배포 가이드](./DEPLOYMENT.md#-백엔드-배포)
- **전체 배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 💡 다음 단계

1. **로컬 개발** ← 👈 현재 여기
2. [배포](./DEPLOYMENT.md) - Vercel + Railway
3. 데이터베이스 통합 - MongoDB
4. 멀티플레이 구현 - Socket.io 완성
5. 모바일 반응형 최적화

---

## 📞 도움말

각 부분에 대한 상세 문서:

- **프론트엔드**: [frontend/DEVELOPMENT.md](./frontend/DEVELOPMENT.md)
- **백엔드**: [backend/DEVELOPMENT.md](./backend/DEVELOPMENT.md)
- **배포**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API 참고**: [backend/DEVELOPMENT.md#api-엔드포인트](./backend/DEVELOPMENT.md#api-엔드포인트)

---

## ✨ 완료!

```
✅ 프로젝트 구조 설정
✅ 프론트엔드 (React + Tailwind + Framer Motion)
✅ 백엔드 (Express + Socket.io)
✅ 게임 로직 구현
✅ API 통합
✅ 배포 가이드

🎮 이제 게임을 즐기세요!
```

---

**문제가 있으세요?** → GitHub Issues 또는 커뮤니티에서 질문하세요!

**Happy Coding! 🚀💣**
