# 📖 사용 방법

## 🚀 빠른 시작 (3단계)

### 1단계: 의존성 설치
```bash
cd d:/Project/WordBombApp
pnpm install
```

### 2단계: 개발 서버 실행
```bash
pnpm run dev
```

자동으로 시작:
- 🎨 프론트엔드: http://localhost:5173
- 🔧 백엔드: http://localhost:3001

### 3단계: 브라우저 열기
```
http://localhost:5173
```

---

## 📋 명령어

### 전체 프로젝트

```bash
# 개발 (프론트+백 동시)
pnpm run dev

# 전체 빌드
pnpm run build

# 의존성 설치
pnpm install
```

### 프론트엔드만

```bash
# 개발 서버만 실행
pnpm -F frontend run dev

# 빌드
pnpm -F frontend run build

# 프리뷰
pnpm -F frontend run preview
```

### 백엔드만

```bash
# 개발 서버만 실행
pnpm -F backend run dev

# 룩스 테스트 (준비중)
pnpm -F backend run lint
```

### 패키지 추가

```bash
# 프론트엔드에 추가
pnpm add -F frontend package-name

# 백엔드에 추가
pnpm add -F backend package-name

# 개발 의존성
pnpm add -D -F frontend package-name
```

---

## 🎮 게임하기

### 1. 홈 화면
```
난이도 선택:
├─ 쉬움   (12초)
├─ 보통   (8초)
└─ 어려움 (5초)
```

### 2. 게임 플레이
```
[ 💣 ] 
[ 과 ]          ← 이 글자를 포함한 단어 입력

예시:
- "사과" ✅
- "괴물" ✅
- "과자" ✅
- "레몬" ❌ (글자 미포함)
```

### 3. 점수
```
단어 길이 × 10 = 기본점수
예: "사과" (2글자) = 20점

콤보 × 5 = 콤보점수
예: 3콤보 = +15점

총점 = 基本 + 콤보
예: 20 + 15 = 35점
```

### 4. 결과
```
최종 점수 표시
├─ 최대 콤보
├─ 라운드 수
├─ 사용 단어
└─ 순위 저장
```

---

## 🧪 API 테스트

### Thunder Client 사용

1. **VS Code 왼쪽 사이드바** → ⚡ Thunder Client 클릭
2. **New Request** 생성
3. 다음 예제 테스트:

### REST Client 사용

`test.http` 파일 생성:

```http
### 단어 검증
POST http://localhost:3001/api/words/validate
Content-Type: application/json

{
  "word": "사과",
  "bombLetter": "과"
}

### 랭킹 조회
GET http://localhost:3001/api/leaderboard?limit=10

### 점수 저장
POST http://localhost:3001/api/leaderboard
Content-Type: application/json

{
  "playerName": "Player1",
  "score": 2500,
  "difficulty": "hard",
  "gameMode": "single"
}

### 헬스 체크
GET http://localhost:3001/health
```

---

## 🔍 디버깅

### 개발자 도구
```
Chrome DevTools:
├─ Elements: DOM 구조 확인
├─ Console: 에러/로그 확인
├─ Network: API 호출 확인
└─ Sources: 디버깅
```

### VS Code 디버깅

#### 프론트엔드
1. Chrome DevTools 활용
2. `debugger;` 포인트 설정
3. F12 → Sources 탭

#### 백엔드
1. `package.json`에서 debug 설정
2. VS Code 디버그 패널
3. F5로 실행

### 로그 확인

```javascript
// Frontend
console.log('메시지:', data)
console.error('에러:', error)

// Backend
console.log('요청:', req.body)
console.error('에러:', error)
```

---

## 🚀 빌드 및 배포

### 프로덕션 빌드

```bash
# 팔전 빌드
pnpm run build

# 프론트엔드 빌드 결과
ls frontend/dist/

# 백엔드는 그대로 배포
```

### Vercel (프론트엔드)

```bash
# 1. GitHub 푸시
git add .
git commit -m "Ready for deploy"
git push

# 2. Vercel 대시보드
# - 프로젝트 선택
# - Root Directory: frontend
# - Deploy

# 3. 환경변수 설정
VITE_API_URL=https://word-bomb-api.railway.app/api
```

### Railway (백엔드)

```bash
# 1. Railway CLI 설치
npm i -g railway

# 2. GitHub 연결
railway connect

# 3. 배포
railway up
```

자세히: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🐛 문제 해결

### "API 연결 오류"
```
해결:
1. 백엔드 서버 실행 확인: pnpm -F backend run dev
2. .env 파일 확인: VITE_API_URL이 정확한가?
3. CORS 설정: backend FRONTEND_URL 확인
```

### "포트 이미 사용 중"
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### "스타일 적용 안 됨"
```bash
# 캐시 초기화
rm -rf node_modules/.vite
pnpm run dev
```

### "Socket.io 연결 실패"
```
확인:
1. 백엔드 실행: pnpm -F backend run dev
2. VITE_SOCKET_URL 확인
3. 브라우저 콘솔 에러 확인
```

---

## 💡 팁

### 개발 효율성
```javascript
// ES7+ 스니펫 (자동완성)
rafce  → React Arrow Function Component
rnf    → React Functional Component
rcc    → React Class Component

// Tailwind 스니펫
tw-    → 클래스 자동완성
```

### 성능 최적화
```
1. 프론트엔드:
   - 컴포넌트 분할
   - 번들 크기 확인: npm run build

2. 백엔드:
   - 응답 시간 모니터
   - 캐싱 활용 (Redis)
```

### 코딩 가이드
```
- 파일명: camelCase (예: gameScreen.jsx)
- 컴포넌트명: PascalCase (예: GameScreen)
- 함수명: camelCase (예: handleSubmit)
- 상수명: UPPER_SNAKE_CASE (예: MAX_COMBO)
```

---

## 📚 추가 정보

- [기술 스택](./TECH_STACK.md) - 상세 기술정보
- [설정 가이드](./SETUP.md) - 파일 구조
- [기능 목록](./FEATURES.md) - 완료/예정 기능
- [배포 가이드](./DEPLOYMENT.md) - 프로덕션 배포

---

**더 궁금한 점?** 각 폴더의 DEVELOPMENT.md를 참고하세요!

```
frontend/DEVELOPMENT.md  - 프론트 개발 가이드
backend/DEVELOPMENT.md   - 백 개발 가이드
```

Happy Coding! 🚀
