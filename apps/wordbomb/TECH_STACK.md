# 🛠️ 기술 스택

## 프론트엔드 스택

### 핵심 라이브러리
```json
{
  "react": "18.2.0",           // UI 렌더링
  "vite": "5.0.0",             // 빠른 번들러
  "tailwindcss": "3.3.6",      // 스타일링
  "framer-motion": "10.16.16", // 애니메이션
  "axios": "1.6.5",            // HTTP 통신
  "socket.io-client": "4.7.2"  // 실시간 통신
}
```

### 개발 도구
```json
{
  "@vitejs/plugin-react": "4.2.1",
  "postcss": "8.4.32",
  "autoprefixer": "10.4.16",
  "eslint": "8.54.0",
  "prettier": "최신"
}
```

### 특징
- ⚡ **Vite**: 번들 크기 ~180KB (gzip)
- 🎨 **Tailwind**: 다크 테마, 커스텀 색상
- 🎬 **Framer Motion**: 복잡한 애니메이션 쉽게
- 🔌 **Socket.io**: WebSocket 기반 실시간 통신

---

## 백엔드 스택

### 핵심 라이브러리
```json
{
  "node": "18+",
  "express": "4.18.2",     // 웹 프레임워크
  "socket.io": "4.7.2",    // 실시간 멀티플레이
  "cors": "2.8.5",         // 크로스 오리진
  "dotenv": "16.3.1"       // 환경변수
}
```

### 선택 라이브러리 (준비중)
```json
{
  "mongoose": "8.0.3",     // MongoDB ORM
  "redis": "4.6.10",       // 캐싱
  "jwt": "latest"          // 인증
}
```

### 특징
- 🚀 **Express**: 가볍고 빠른 웹 프레임워크
- 🔄 **Socket.io**: 턴제 게임 로직
- 💾 **In-memory**: 현재 메모리 기반 저장
- 📊 **확장 가능**: MongoDB/Redis 통합 준비

---

## 데이터베이스 (선택)

### 프로덕션 구성
```
기본 (무료):
├─ Frontend: Vercel
├─ Backend: Railway (500시간/월)
└─ Database: MongoDB Atlas (512MB)

선택 (성능):
├─ Caching: Redis Cloud
├─ CDN: Cloudflare
└─ Monitoring: Sentry
```

### 현재 상태
- ✅ In-memory 단어 사전 (300+ 단어)
- ✅ In-memory 랭킹 (최대 1000개)
- 🚧 MongoDB 연결 준비 완료

---

## DevOps & 배포

### 로컬 개발
```bash
pnpm install      # 의존성 설치
pnpm run dev      # 개발 서버 (프론트+백 동시)
pnpm run build    # 프로덕션 빌드
```

### 배포 플랫폼
```
Frontend:  Vercel (무료 티어)
Backend:   Railway 또는 Fly.io (무료 크레딧)
Database:  MongoDB Atlas (무료 512MB)
```

### CI/CD
- ✅ GitHub Actions 예제 포함
- 🚧 Docker 지원 준비 중

---

## 개발 도구

### VS Code 확장
```
✅ ES7+ React/Redux snippets
✅ Tailwind CSS IntelliSense
✅ Prettier - Code formatter
✅ Thunder Client (API 테스트)
✅ GitLens (Git 추적)
✅ TODO Highlight
```

### 성능
| 항목 | 지표 |
|------|------|
| 번들 크기 (FE) | ~180KB (gzip) |
| API 응답 | <100ms |
| Socket 메시지 | <50ms |
| 렌더링 | 60fps 안정 |

### 브라우저 지원
```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Chrome/Safari
```

---

## 아키텍처

### Monorepo 구조
```
word-bomb/
├── frontend/          # React + Vite
├── backend/           # Node.js + Express
├── shared/            # 공유 타입/상수 (준비중)
└── package.json       # pnpm workspaces
```

### API 구조
```
REST Endpoints:
├─ POST /api/words/validate      (단어 검증)
├─ GET /api/leaderboard          (랭킹 조회)
├─ POST /api/leaderboard         (점수 저장)
└─ POST /api/rooms/:id/join      (게임방)

WebSocket Events:
├─ join_room           (참가)
├─ start_game          (시작)
├─ submit_word         (정답 제출)
└─ game_end            (종료)
```

---

더 자세한 정보:
- [설치 방법](./SETUP.md)
- [사용 방법](./USAGE.md)
- [배포 가이드](./DEPLOYMENT.md)
