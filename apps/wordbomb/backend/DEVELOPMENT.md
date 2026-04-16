# 백엔드 개발 가이드

## 프로젝트 구조

```
backend/
├── src/
│   ├── routes/              # API 라우트
│   │   ├── wordRoutes.js    # 단어 검증 엔드포인트
│   │   ├── leaderboardRoutes.js  # 랭킹 엔드포인트
│   │   └── roomRoutes.js    # 게임방 엔드포인트
│   ├── controllers/         # 비즈니스 로직
│   │   ├── wordController.js
│   │   ├── leaderboardController.js
│   │   └── roomController.js
│   ├── utils/               # 유틸리티
│   │   ├── wordDictionary.js  # 단어 검증 로직
│   │   └── socketManager.js   # Socket.io 게임 로직
│   ├── middleware/          # 미들웨어 (준비중)
│   └── config/              # 설정 (준비중)
├── server.js                # Express 서버 진입점
└── package.json
```

## 개발 실행

```bash
cd backend
npm install
npm run dev
```

자동 재시작 활성화 (node --watch 사용)

## API 엔드포인트

### Word Validation
```
POST /api/words/validate
Content-Type: application/json

{
  "word": "사과",
  "bombLetter": "과"
}

Response:
{
  "valid": true
}
```

### Get Leaderboard
```
GET /api/leaderboard?limit=20

Response:
{
  "leaderboard": [
    {
      "id": 123456,
      "playerName": "Player1",
      "score": 2500,
      "difficulty": "hard",
      "gameMode": "single",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Submit Score
```
POST /api/leaderboard
Content-Type: application/json

{
  "playerName": "Player1",
  "score": 2500,
  "difficulty": "hard",
  "gameMode": "single"
}

Response:
{
  "success": true,
  "rank": 5
}
```

### Create Game Room
```
POST /api/rooms

{
  "playerName": "Host",
  "difficulty": "normal"
}

Response:
{
  "success": true,
  "roomId": "abc123"
}
```

### Join Game Room
```
POST /api/rooms/:roomId/join

{
  "playerName": "Player2"
}

Response:
{
  "success": true,
  "room": {
    "id": "abc123",
    "host": "Host",
    "difficulty": "normal",
    "players": ["Host", "Player2"],
    "status": "waiting"
  }
}
```

## Socket.io 이벤트

### 클라이언트 → 서버

```javascript
// 게임방 입장
socket.emit('join_room', { roomId })

// 게임 시작
socket.emit('start_game', { roomId })

// 단어 제출
socket.emit('submit_word', { word, roomId })

// 게임방 퇴장
socket.emit('leave_room', { roomId })
```

### 서버 → 클라이언트

```javascript
// 플레이어 입장 알림
socket.on('player_joined', { playerName })

// 게임 시작
socket.on('game_start', gameState)

// 플레이어 정답
socket.on('player_answer', { playerName, word, timestamp })

// 플레이어 탈락
socket.on('player_eliminated', { playerName })

// 게임 종료
socket.on('game_end', results)

// 플레이어 퇴장
socket.on('player_left', { playerName })
```

## 환경 변수

`.env` 파일 생성:

```
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Optional (준비중)
MONGODB_URI=mongodb://localhost:27017/wordbomb
REDIS_URL=redis://localhost:6379
```

## 주요 함수

### wordDictionary.js
```javascript
// 단어 유효성 검증
isValidWord(word: string): boolean

// 모든 단어 조회
getWords(): string[]

// 단어 추가
addWords(words: string[]): void
```

### socketManager.js
- 실시간 게임 상태 관리
- 플레이어 입장/퇴장 이벤트
- 답 제출 및 검증
- 게임 종료 로직

## 데이터 흐름

### 싱글플레이
```
Client: 단어 입력
  ↓
POST /api/words/validate
  ↓
Server: wordDictionary에서 검증
  ↓
Client: 결과 처리
  ↓
POST /api/leaderboard (게임 종료 시)
```

### 멀티플레이 (준비중)
```
Client 1: 게임방 생성
  ↓
POST /api/rooms
  ↓
Server: 게임방 저장
  ↓
Client 2: 게임방 입장
  ↓
Socket: join_room
  ↓
Server: 플레이어 추가, 모든 클라이언트에 알림
  ↓
클라이언트들: 게임 시작
  ↓
Socket: start_game → game_start
  ↓
실시간 턴제 게임 진행
```

## 빌드 및 배포

```bash
# 프로덕션 빌드 (필요한 경우)
npm run build

# 프로덕션 실행
npm start
```

Railway/Fly.io 배포:
1. 리포지토리 root를 `backend/`로 설정
2. 시작 명령어: `npm start`
3. 환경 변수 설정
4. PORT는 플랫폼에서 자동 할당 (`.env`에서 덮어쓰기 가능)

## 다음 단계 (TODO)

### 데이터베이스 통합
- [ ] MongoDB 스키마 설정
- [ ] Mongoose 모델 작성
- [ ] 유저 인증 (JWT)
- [ ] 랭킹 DB 저장

### 캐싱
- [ ] Redis 연결
- [ ] 세션 저장
- [ ] 게임방 상태 캐싱

### 향상된 멀티플레이
- [ ] 턴제 게임 로직 완성
- [ ] 점수 계산 로직
- [ ] 타임아웃 처리
- [ ] 연결 끊김 복구

### 모니터링
- [ ] 로깅 시스템
- [ ] 에러 트래킹 (Sentry)
- [ ] 성능 모니터링

## 트러블슈팅

### Port already in use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

### CORS 에러
- `FRONTEND_URL`이 올바른지 확인
- `cors` 설정 확인

### Socket.io 연결 실패
- 클라이언트 URL과 서버 port 일치 확인
- 방화벽 설정 확인
