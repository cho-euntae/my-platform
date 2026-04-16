# 프론트엔드 개발 가이드

## 프로젝트 구조

```
frontend/
├── src/
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   └── GameScreen.jsx   # 게임 화면 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── HomePage.jsx     # 홈 페이지 (난이도 선택)
│   │   ├── GamePage.jsx     # 게임 플레이 페이지
│   │   ├── ResultPage.jsx   # 결과 페이지
│   │   ├── MultiplayerLobby.jsx
│   │   └── MultiplayerGame.jsx
│   ├── hooks/              # 커스텀 React 훅
│   ├── utils/              # 유틸리티 함수
│   │   ├── gameConfig.js    # 게임 설정 상수
│   │   ├── api.js           # REST API 클라이언트
│   │   └── socketManager.js # Socket.io 관리
│   ├── styles/             # 전역 스타일
│   │   └── globals.css      # Tailwind 기본 스타일
│   ├── App.jsx             # 메인 앱 컴포넌트
│   └── main.jsx            # 엔트리 포인트
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 개발 실행

```bash
cd frontend
npm install
npm run dev
```

## 주요 파일 설명

### App.jsx
- 메인 라우팅 및 상태 관리
- 화면 전환 로직 (홈 → 게임 → 결과)
- 게임 모드 전환 (싱글/멀티)

### pages/GamePage.jsx
- 게임 로직 (타이머, 점수, 콤보)
- 단어 검증 (백엔드 API 호출)
- GameScreen 컴포넌트 호출

### components/GameScreen.jsx
- 게임 UI 렌더링
- Framer Motion 애니메이션
- 입력 필드 및 피드백

### utils/gameConfig.js
- 난이도 설정
- 제시 글자 목록
- 색상 상수

### utils/api.js
- Axios 기반 API 클라이언트
- 단어 검증, 랭킹, 게임방 관리

### utils/socketManager.js
- Socket.io 초기화
- 멀티플레이 이벤트 핸들러

## 스타일링 (Tailwind CSS)

모든 스타일은 Tailwind 유틸리티 클래스 사용:

```jsx
<div className="w-full max-w-md bg-dark-card rounded-2xl p-6 border border-dark-border">
  <h1 className="text-3xl font-black text-bomb-500">단어 폭탄</h1>
</div>
```

### 커스텀 색상 (tailwind.config.js)
- `bg-dark-*` — 배경 색상
- `text-bomb-*` — 폭탄 테마 색상
- Tailwind 기본 색상도 사용 가능 (`red-500`, `green-500` 등)

## 애니메이션 (Framer Motion)

```jsx
import { motion } from 'framer-motion'

<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
  💣
</motion.div>
```

## 환경 변수

`.env` 파일 생성:

```
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

접근 방법:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

Vercel 배포:
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 프로젝트 settings에서 Root Directory를 `frontend/` 로 설정
4. 환경 변수 추가 후 배포

## 트러블슈팅

### API 연결 안 됨
- `VITE_API_URL`과 백엔드 주소가 일치하는지 확인
- 백엔드 CORS 설정 확인

### Socket.io 연결 불가
- 백엔드 서버가 실행 중인지 확인
- `VITE_SOCKET_URL`이 올바른지 확인

### 스타일이 적용 안 됨
- `npm run dev` 재시작
- `tailwind.config.js`의 `content` 경로 확인
