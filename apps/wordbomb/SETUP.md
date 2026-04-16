# ⚙️ 파일 설정 및 구성

## 프로젝트 구조

```
WordBombApp/
├── 🎨 frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   └── GameScreen.jsx      # 게임 UI 컴포넌트
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # 홈 (난이도 선택)
│   │   │   ├── GamePage.jsx        # 게임 플레이
│   │   │   ├── ResultPage.jsx      # 결과 화면
│   │   │   ├── MultiplayerLobby.jsx
│   │   │   └── MultiplayerGame.jsx
│   │   ├── utils/
│   │   │   ├── gameConfig.js       # 게임 설정
│   │   │   ├── api.js              # REST API 클라이언트
│   │   │   └── socketManager.js    # Socket.io
│   │   ├── styles/
│   │   │   └── globals.css         # 전역 스타일
│   │   ├── App.jsx                 # 메인 라우팅
│   │   └── main.jsx                # 엔트리포인트
│   ├── public/                     # 정적 파일
│   ├── index.html
│   ├── vite.config.js              # Vite 설정
│   ├── tailwind.config.js          # Tailwind 설정
│   ├── postcss.config.js           # PostCSS 설정
│   ├── .env.example                # 환경변수 템플릿
│   ├── .gitignore
│   ├── package.json
│   └── DEVELOPMENT.md              # 프론트 개발 가이드
│
├── 🔧 backend/                     # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   │   ├── wordRoutes.js       # 단어 검증 API
│   │   │   ├── leaderboardRoutes.js
│   │   │   └── roomRoutes.js
│   │   ├── controllers/            # 비즈니스 로직
│   │   │   ├── wordController.js
│   │   │   ├── leaderboardController.js
│   │   │   └── roomController.js
│   │   ├── utils/
│   │   │   ├── wordDictionary.js   # 300+ 단어
│   │   │   └── socketManager.js    # Socket.io 로직
│   │   ├── middleware/             # (준비중)
│   │   ├── models/                 # (준비중: DB)
│   │   └── config/                 # (준비중)
│   ├── data/                       # 데이터 파일
│   ├── server.js                   # Express 서버
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── DEVELOPMENT.md              # 백엔드 개발 가이드
│
├── shared/                         # 공유 타입/상수 (준비중)
├── dev-server.js                   # 개발 자동 실행 스크립트
├── package.json                    # pnpm workspaces
├── pnpm-workspace.yaml             # monorepo 설정
├── .gitignore
│
├── 📚 README.md                    # 메인 README
├── QUICK_START.md                  # 5분 시작 가이드
├── SETUP.md                        # 이 파일
├── FEATURES.md                     # 기능 목록
├── TECH_STACK.md                   # 기술 스택
├── USAGE.md                        # 사용 방법
├── DEPLOYMENT.md                   # 배포 가이드
├── PROJECT_SUMMARY.md              # 프로젝트 요약
└── INSTALLATION_CHECKLIST.md       # 체크리스트
```

---

## 환경 변수 설정

### 프론트엔드 (.env)

**파일 위치**: `frontend/.env`

```bash
# API 서버 주소
VITE_API_URL=http://localhost:3001/api

# Socket.io 서버 주소
VITE_SOCKET_URL=http://localhost:3001
```

### 백엔드 (.env)

**파일 위치**: `backend/.env`

```bash
# 포트 (기본값: 3001)
PORT=3001

# 프론트엔드 주소 (CORS)
FRONTEND_URL=http://localhost:5173

# 환경 (development / production)
NODE_ENV=development

# 선택 (나중에 추가)
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wordbomb
# REDIS_URL=redis://localhost:6379
```

### 환경변수 생성 방법

```bash
# 프론트엔드
cd frontend
cp .env.example .env

# 백엔드
cd ../backend
cp .env.example .env
```

---

## 파일 규모

### 코드 라인 수
```
Frontend:
  - App.jsx: ~60 라인
  - HomePage.jsx: ~80 라인
  - GamePage.jsx: ~150 라인
  - GameScreen.jsx: ~200 라인
  - API & Config: ~150 라인
  - 스타일: ~50 라인
  - 설정: ~150 라인
  총계: ~1,000 라인

Backend:
  - server.js: ~40 라인
  - Controllers: ~100 라인
  - Routes: ~30 라인
  - wordDictionary.js: ~50 라인
  - socketManager.js: ~80 라인
  총계: ~330 라인

문서: ~2,000 라인
```

### 의존성 규모
```
Frontend: 6개 코어 라이브러리
Backend: 7개 코어 라이브러리
총 패키지: ~437개 (node_modules)
설치 크기: ~200MB
```

---

## 핵심 설정 파일 설명

### vite.config.js (프론트엔드)
```javascript
// 개발 서버 포트: 5173
// 프록시 설정: /api → http://localhost:3001
// 플러그인: React JSX 지원
```

### tailwind.config.js (프론트엔드)
```javascript
// 커스텀 테마: dark-bg, dark-card, bomb-*
// 커스텀 애니메이션: bombFloat, explode, shake 등
// 다크 모드 디폴트
```

### package.json (루트)
```json
{
  "workspaces": ["frontend", "backend"],  // pnpm monorepo
  "scripts": {
    "dev": "node dev-server.js",          // 프론트+백 동시 시작
    "build": "pnpm -r build",             // 전체 빌드
    "frontend": "pnpm -F frontend dev",   // 프론트만
    "backend": "pnpm -F backend dev"      // 백만
  }
}
```

### pnpm-workspace.yaml (루트)
```yaml
packages:
  - 'frontend'
  - 'backend'
```

---

## 주요 파일 및 역할

| 파일 | 역할 | 중요도 |
|------|------|--------|
| App.jsx | 메인 라우팅 & 상태관리 | ⭐⭐⭐ |
| GamePage.jsx | 게임 로직 | ⭐⭐⭐ |
| GameScreen.jsx | UI 컴포넌트 | ⭐⭐⭐ |
| gameConfig.js | 게임 설정 & 글자 | ⭐⭐ |
| api.js | REST API 호출 | ⭐⭐ |
| server.js | Express 서버 | ⭐⭐⭐ |
| wordController.js | 단어 검증 로직 | ⭐⭐⭐ |
| wordDictionary.js | 300+ 한국어 단어 | ⭐⭐ |
| socketManager.js | Socket.io 로직 | ⭐⭐ |

---

## 스타일 시스템

### Tailwind Color Tokens
```css
/* Background */
--dark-bg:     #0B0E14  (텁배경)
--dark-card:   #141921  (카드)
--dark-border: #1E2736  (테두리)

/* Text */
--dark-text:   #E2E8F0  (주 텍스트)
--dark-sub:    #64748B  (보조 텍스트)

/* Accent */
--bomb-500:    #FF6B2C  (주요 색상)
--bomb-600:    #FF5511
--bomb-700:    #E64A0E
```

### Animation Keyframes
```
bombFloat    - 폭탄 떠다니기 (2s 무한)
bombPulse    - 폭탄 맥박 (0.5s 무한)
shakeScreen  - 화면 진동 (0.4s)
explode      - 폭발 (0.8s)
fadeInUp     - 위로 페이드 (0.3s)
comboPop     - 콤보 팝 (0.3s)
```

---

## 배포 설정

### Vercel (프론트엔드)
- Framework: Vite
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### Railway (백엔드)
- Root Directory: `backend`
- Start Command: `npm start`
- Environment: Node.js

자세히: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 다음 단계

1. **환경변수 설정**: 각 `.env.example`에서 `.env` 생성
2. **의존성 설치**: `pnpm install`
3. **개발 서버 실행**: `pnpm run dev`
4. **브라우저 열기**: http://localhost:5173

더 알아보기: [사용 방법](./USAGE.md)
