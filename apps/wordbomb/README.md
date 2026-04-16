# 🎮 단어 폭탄 (Word Bomb)

끄투 스타일의 멀티플레이 단어 게임입니다. 제한 시간 안에 제시된 글자가 포함된 단어를 빠르게 입력하세요!

## ⚡ 빠른 시작

```bash
pnpm install
pnpm run dev
```

브라우저 열기: **http://localhost:5173**

---

## 📚 문서

프로젝트를 더 잘 이해하기 위해 다음 문서들을 참고하세요:

| 문서 | 설명 |
|------|------|
| [QUICK_START.md](./QUICK_START.md) | 🚀 5분 안에 시작하기 |
| [FEATURES.md](./FEATURES.md) | ✅ 완료된 기능 / 🚧 준비중 기능 |
| [TECH_STACK.md](./TECH_STACK.md) | 🛠️ 기술 스택 상세 |
| [SETUP.md](./SETUP.md) | ⚙️ 파일 구조 & 환경설정 |
| [USAGE.md](./USAGE.md) | 📖 사용 방법 & 명령어 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 🚀 배포 가이드 (Vercel + Railway) |

---

## 🎯 프로젝트 개요

### ✅ 완료된 기능
- 싱글플레이 (쉬움/보통/어려움)
- 점수 계산 및 콤보 시스템
- 300+ 한국어 단어 검증
- 화려한 애니메이션 (Framer Motion)
- 랭킹 저장 & 조회
- 다크 테마 & 모바일 반응형

### 🚧 준비중
- 멀티플레이 (실시간 턴제 게임)
- 유저 인증 & 프로필
- 데이터베이스 (MongoDB)

---

## 🛠️ 기술 스택

**Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion  
**Backend**: Node.js + Express + Socket.io  
**배포**: Vercel (프론트) + Railway (백엔드)

더 자세히: [TECH_STACK.md](./TECH_STACK.md)

---

## 📁 프로젝트 구조

```
WordBombApp/
├── frontend/          # React + Vite
├── backend/           # Node.js + Express
├── shared/            # 공유 파일 (준비중)
└── dev-server.js      # 개발 서버 실행 스크립트
```

자세한 구조: [SETUP.md](./SETUP.md)

---

## 🚀 주요 명령어

```bash
# 전체 (프론트 + 백 동시)
pnpm run dev

# 프론트엔드만
pnpm -F frontend run dev

# 백엔드만
pnpm -F backend run dev

# 빌드
pnpm run build
```

더 많은 명령어: [USAGE.md](./USAGE.md)

---

## 🚀 배포

### Vercel (프론트엔드)
프론트엔드를 Vercel에 무료 배포

### Railway (백엔드)
백엔드를 Railway에 무료 배포 (500시간/월)

자세한 배포 가이드: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎮 게임 방식

1. **난이도 선택** - 쉬움(12초) / 보통(8초) / 어려움(5초)
2. **글자 입력** - 제시된 글자가 포함된 단어 입력
3. **점수 획득** - 단어길이×10 + 콤보보너스
4. **결과 저장** - 게임 종료 후 점수 저장

---

## 💡 개발 팁

### VS Code 확장 (설치됨)
- ✅ ES7+ React snippets
- ✅ Tailwind CSS IntelliSense
- ✅ Prettier
- ✅ Thunder Client (API 테스트)
- ✅ GitLens

### 개발 효율성
```
rafce  → React 컴포넌트 자동 생성
tw-    → Tailwind 클래스 자동완성
```

---

## 🐛 문제 해결

### "API 연결 오류?"
→ 백엔드가 실행 중인지 확인: `pnpm -F backend run dev`

### "포트 이미 사용 중?"
→ 기존 프로세스 종료 후 다시 시작

### "스타일 안 적용?"
→ `pnpm run dev` 재시작

더 자세한 문제 해결: [USAGE.md - 문제 해결](./USAGE.md#-문제-해결)

---

## 📊 프로젝트 규모

- **코드**: ~1,600 라인 (프론트 1,000 + 백 600)
- **문서**: ~5,000 라인
- **패키지**: ~437개
- **번들 크기**: ~180KB (gzip)

---

## 🎓 학습 자료

- [React 공식 문서](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Socket.io](https://socket.io)

---

## 📝 라이센스

MIT - 자유롭게 사용, 수정, 배포 가능

---

## 💬 다음 단계

1. **[QUICK_START.md](./QUICK_START.md)** - 5분 만에 시작
2. **[FEATURES.md](./FEATURES.md)** - 기능 확인
3. **[USAGE.md](./USAGE.md)** - 명령어 배우기
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 배포하기

---

**Made with 💣 and ❤️** — Word Bomb Game

🚀 지금 시작하세요!
# 단어 폭탄 - Word Bomb Game

끄투 스타일의 멀티플레이 단어 게임입니다. 제한 시간 안에 제시된 글자가 포함된 단어를 빠르게 입력하세요!

## 🎮 프로젝트 구조

```
word-bomb/
├── frontend/                 # React + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/       # UI 컴포넌트
│   │   ├── pages/           # 페이지 (홈, 게임, 결과)
│   │   ├── utils/           # API, Socket.io, 설정
│   │   └── styles/          # 전역 스타일
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express + Socket.io
│   ├── src/
│   │   ├── routes/          # API 라우트
│   │   ├── controllers/     # 비즈니스 로직
│   │   ├── utils/           # Socket.io, 단어 검증
│   │   └── middleware/      # 인증, 로깅 등
│   ├── server.js
│   └── package.json
│
└── shared/                   # 공유 타입/상수 (추후)
```

## 🚀 빠른 시작

### 1️⃣ 프론트엔드 설정

```bash
cd frontend
npm install
# 또는
pnpm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 2️⃣ 백엔드 설정

```bash
cd backend
npm install
# 또는
pnpm install

# .env 파일 생성
cp .env.example .env

# 개발 서버 실행
npm run dev
```

API 서버: `http://localhost:3001`

## 📦 주요 기술 스택

### 프론트엔드
- **React 18** — UI 렌더링
- **Tailwind CSS** — 유틸리티 스타일링
- **Framer Motion** — 애니메이션 (폭발, 진동 등)
- **Socket.io Client** — 실시간 멀티플레이
- **Vite** — 고속 번들러

### 백엔드
- **Node.js + Express** — REST API 서버
- **Socket.io** — WebSocket 기반 실시간 게임
- **CORS** — 크로스 오리진 통신

### 데이터 (추후 통합)
- **MongoDB** — 유저 정보, 랭킹, 단어 사전
- **Redis** — 세션/게임 상태 캐싱

## 🎯 주요 기능

### 현재 구현됨 ✅
- ✅ 싱글플레이 (쉬움/보통/어려움)
- ✅ 제시 글자가 포함된 단어 입력 시스템
- ✅ 콤보 시스템 및 동적 스코어링
- ✅ HP 기반 생명 시스템
- ✅ 실시간 타이머 및 긴급 알림
- ✅ 사용한 단어 목록 표시
- ✅ 화려한 애니메이션 (Framer Motion)
- ✅ 제시 글자 자동 생성
- ✅ 단어 음원 및 유효성 검증 API
- ✅ 랭킹 시스템

### 준비중 🚧
- 🚧 멀티플레이 (턴제 대전)
- 🚧 실시간 게임 로비
- 🚧 친구 초대 시스템
- 🚧 토너먼트 모드
- 🚧 일일 퀘스트
- 🚧 유저 시즌/배틀패스

## 🛠️ API 엔드포인트

### Word Validation
```
POST /api/words/validate
Body: { word: string, bombLetter: string }
Response: { valid: boolean, error?: string }
```

### Leaderboard
```
GET /api/leaderboard?limit=20
POST /api/leaderboard
Body: { playerName, score, difficulty, gameMode }
```

### Multiplayer Rooms
```
POST /api/rooms
POST /api/rooms/:roomId/join
```

## 🔌 Socket.io 이벤트

```javascript
// 게임방 참여
socket.emit('join_room', { roomId })
socket.on('player_joined', callback)

// 게임 시작
socket.on('game_start', callback)

// 단어 제출
socket.emit('submit_word', { word })
socket.on('player_answer', callback)

// 게임 종료
socket.on('game_end', callback)
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary (bomb-500)**: `#FF6B2C` — 주요 색상
- **Accent (amber-500)**: `#F59E0B` — 강조 색상
- **Danger (red-500)**: `#EF4444` — 경고/실패
- **Success (green-500)**: `#22C55E` — 성공
- **Dark BG**: `#0B0E14` — 배경
- **Dark Card**: `#141921` — 카드

### 애니메이션
- 폭탄 떠다니기: `bombFloat` (2s)
- 폭발 이펙트: `explode` (0.8s)
- 화면 진동: `shake` (0.4s)
- 콤보 팝: `comboPop` (0.3s)

## 📝 환경 변수

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 🚀 배포 가이드

### Vercel (프론트엔드)
1. GitHub에 저장소 푸시
2. Vercel 연결 후 `frontend/` 디렉토리 선택
3. 환경 변수 설정 후 배포

### Railway / Fly.io (백엔드)
1. GitHub 저장소 연결
2. Root 디렉토리를 `backend/`로 설정
3. 환경 변수 설정
4. 배포

## 🔄 다음 단계

### Phase 1 (현재)
- [x] 기본 게임 로직
- [x] 애니메이션
- [ ] 로컬 데이터 저장

### Phase 2 (이후)
- [ ] MongoDB 통합
- [ ] 유저 인증 (JWT)
- [ ] 멀티플레이 구현
- [ ] 친구 시스템

### Phase 3 (장기)
- [ ] 모바일 앱 (React Native)
- [ ] 토너먼트 시스템
- [ ] 실시간 랭킹
- [ ] 배틀패스

## 📚 학습 자료

- [React 공식 문서](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io](https://socket.io)
- [Vite](https://vitejs.dev)

## 🤝 기여 방법

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다. [LICENSE](./LICENSE) 참조

## 💬 피드백 및 문의

이슈 제기 또는 풀 리퀘스트를 환영합니다!

---

**Made with 💣 and ❤️** — Word Bomb Game
